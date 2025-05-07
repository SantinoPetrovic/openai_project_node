import { Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { OpenAI } from 'openai';
import db from '../models';

import sanitizeHtml from 'sanitize-html';

const { Conversation, Message } = db;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatWithOpenAI = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const { conversationId } = req.params;
  const { content } = req.body;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!content) {
    res.status(400).json({ error: 'Content is required' });
    return;
  }

  try {
    const conversation = await Conversation.findOne({
      where: { id: conversationId, userId },
    });

    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found or access denied' });
      return;
    }

    await Message.create({
      conversationId: parseInt(conversationId, 10),
      role: 'user',
      content,
      tokensUsed: 0,
    });

    const messages = await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']],
    });

    const openAIMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? 'gpt-3.5-turbo',
      messages: openAIMessages,
    });

    const aiContent = response.choices[0]?.message?.content ?? '';
    const tokensUsed = response.usage?.total_tokens ?? 0;

    const sanitizedContent = sanitizeHtml(aiContent, {
      allowedTags: ['b', 'i', 'strong', 'em', 'code'],
      allowedAttributes: {},
    });

    const assistantMessage = await Message.create({
      conversationId: parseInt(conversationId, 10),
      role: 'assistant',
      content: sanitizedContent,
      tokensUsed,
    });

    await conversation.update({
      tokensUsed: (conversation.tokensUsed ?? 0) + tokensUsed,
    });

    res.status(200).json({
      assistantMessage,
      tokensUsed,
    });
  } catch (error) {
    console.error('Error chatting with OpenAI:', error);
    res.status(500).json({ error: 'Failed to chat with OpenAI' });
  }
};
