import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface PromptAttributes {
  id: number;
  systemPrompt: string;
  value: string;
}

interface PromptCreationAttributes extends Optional<PromptAttributes, 'id'> {}

export class Prompt extends Model<PromptAttributes, PromptCreationAttributes> implements PromptAttributes {
  public id!: number;
  public systemPrompt!: string;
  public value!: string;
}

export const PromptFactory = (sequelize: Sequelize) => {
  Prompt.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      systemPrompt: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Prompt',
      tableName: 'prompts',
    }
  );

  return Prompt;
};
