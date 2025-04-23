import { Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { OpenAI } from 'openai';
import db from '../models';

const { Prompt } = db;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const startOpenAI = async (req: AuthenticatedRequest, res: Response) => {
  const { role } = req.body;

  if (!role) {
    res.status(400).json({ error: 'Role is required' });
    return;
  }

  try {
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

    res.status(200).json({ response: message });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
};