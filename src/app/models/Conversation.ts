import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface ConversationAttributes {
  id: number;
  userId: number;
  role: string;
  messages: string;
  tokensUsed: number;
}

interface ConversationCreationAttributes extends Optional<ConversationAttributes, 'id'> {}

export class Conversation extends Model<ConversationAttributes, ConversationCreationAttributes> implements ConversationAttributes {
  public id!: number;
  public userId!: number;
  public role!: string;
  public messages!: string;
  public tokensUsed!: number;
}

export const ConversationFactory = (sequelize: Sequelize) => {
  Conversation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      messages: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      tokensUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Conversation',
      tableName: 'conversations',
    }
  );

  return Conversation;
};