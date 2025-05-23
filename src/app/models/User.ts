import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  tokensUsed: number;
  tokenLimit: number;
  resetToken: String | null;
  resetTokenExpires: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public username!: string;
  public password!: string;
  public tokensUsed!: number;
  public tokenLimit!: number;
  public resetToken!: String | null;
  public resetTokenExpires!: Date | null;
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
      username: {
        type: DataTypes.STRING,
        allowNull: false
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
      },
      resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  return User;
};
