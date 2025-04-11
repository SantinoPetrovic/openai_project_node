import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db';
import { PromptFactory, Prompt } from './Prompt';
import { UserFactory, User } from './User';

const db: {
  sequelize: Sequelize;
  User: typeof User;
  Prompt: typeof Prompt;
} = {
  sequelize,
  User: UserFactory(sequelize),
  Prompt: PromptFactory(sequelize),
};

export default db;
