import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db';
import { ConversationFactory, Conversation } from './Conversation';
import { MessageFactory, Message } from './Message';
import { PromptFactory, Prompt } from './Prompt';
import { UserFactory, User } from './User';

const db: {
  sequelize: Sequelize;
  Conversation: typeof Conversation;
  Message: typeof Message;
  Prompt: typeof Prompt;
  User: typeof User;
} = {
  sequelize,
  Conversation: ConversationFactory(sequelize),
  Message: MessageFactory(sequelize),
  Prompt: PromptFactory(sequelize),
  User: UserFactory(sequelize),
};

Conversation.hasMany(Message, { foreignKey: 'conversationId' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId' });

User.hasMany(Conversation, { foreignKey: 'userId' });
Conversation.belongsTo(User, { foreignKey: 'userId' });

export default db;
