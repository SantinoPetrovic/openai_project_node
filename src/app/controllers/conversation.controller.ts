import { Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import db from '../models';

const { Conversation, Message } = db;

export const getAllConversations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  };

  try {
    const conversations = await Conversation.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getConversationById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const { id } = req.params;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  };

  try {
    const conversation = await Conversation.findOne({
      where: { id, userId },
      include: [{ model: Message, order: [['createdAt', 'ASC']] }],
    });

    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found' });
      return;
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Failed to fetch conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createConversation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const { role } = req.body;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!role) {
    res.status(400).json({ error: 'Role is required to create a conversation' });
    return;
  }

  try {
    const newConversation = await Conversation.create({
      userId,
      role,
      tokensUsed: 0,
    });

    res.status(201).json(newConversation);
  } catch (error) {
    console.error('Failed to create conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};