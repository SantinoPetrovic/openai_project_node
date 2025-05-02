import { Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { OpenAI } from 'openai';
import db from '../models';

const { Prompt, Conversation, Message } = db;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const startOpenAI = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const { role } = req.body;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!role) {
    res.status(400).json({ error: 'Role is required' });
    return;
  }

  try {
    const newConversation = await Conversation.create({
      userId,
      role,
      tokensUsed: 0,
    });

    const prompt = await Prompt.findOne({ where: { value: 'roleOpenAi' } });
    if (!prompt) {
      res.status(404).json({ error: 'Prompt for role OpenAi not found.' });
      return;
    }

    const filledSystemPrompt = prompt.systemPrompt.replace(/{{role}}/g, role);

    const response = await openai.chat.completions.create({
      model: process.env?.OPENAI_MODEL ?? 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: filledSystemPrompt }],
    });

    const message = response.choices[0]?.message?.content;

    await Message.create({
      conversationId: newConversation.id,
      role: 'system',
      content: filledSystemPrompt,
      tokensUsed: 0,
    });

    res.status(200).json({
      conversation: newConversation,
      message,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
};