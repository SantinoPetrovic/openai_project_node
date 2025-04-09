import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db';
import { UserFactory, User } from './User';

const db: {
  sequelize: Sequelize;
  User: typeof User;
} = {
  sequelize,
  User: UserFactory(sequelize),
};

// Define associations
/*db.User.hasMany(db.ResumeAnalysis, { foreignKey: 'userId' });
db.ResumeAnalysis.belongsTo(db.User, { foreignKey: 'userId' });*/

export default db;
