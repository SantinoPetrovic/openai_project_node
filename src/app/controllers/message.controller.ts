import { Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import db from '../models';

const { Message, Conversation } = db;

export const getMessagesByConversationId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  };

  const { conversationId } = req.params;

  try {
    const conversation = await Conversation.findOne({
      where: { id: conversationId, userId },
    });

    if (!conversation) {
      res.status(404).json({ error: 'Conversation not found or access denied' });
      return;
    }

    const messages = await Message.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const createMessage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  };

  const { conversationId } = req.params;
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: 'Content are required' });
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

    const newMessage = await Message.create({
      conversationId: parseInt(conversationId, 10),
      role: conversation.role,
      content,
      tokensUsed: 0,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
};
