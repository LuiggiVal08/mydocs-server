import dbConn from '@/config/dbConn';
import { DataTypes, Model } from 'sequelize';
import User from './user';

class Student extends Model {}

Student.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        id_user: {
            type: DataTypes.UUID,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    {
        sequelize: dbConn,
        modelName: 'Student',
        tableName: 'Students',
    },
);
Student.belongsTo(User, { foreignKey: 'user_id' });
// Student.sync({force:true})
// Student.sync()
export default Student;
