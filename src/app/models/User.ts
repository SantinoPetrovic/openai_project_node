import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  tokensUsed: number;
  tokenLimit: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public tokensUsed!: number;
  public tokenLimit!: number;
}

export const UserFactory = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tokensUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tokenLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  return User;
};
