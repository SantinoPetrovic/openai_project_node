import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db';
/*import { UserFactory } from './User';
import { ResumeAnalysisFactory } from './ResumeAnalysis';*/

const db: {
  sequelize: Sequelize;
} = {
  sequelize
};

/*{
  sequelize,
  User: UserFactory(sequelize),
  ResumeAnalysis: ResumeAnalysisFactory(sequelize),
};*/

// Define associations
/*db.User.hasMany(db.ResumeAnalysis, { foreignKey: 'userId' });
db.ResumeAnalysis.belongsTo(db.User, { foreignKey: 'userId' });*/

export default db;
