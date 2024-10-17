import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import Student from './student';

interface FolderAttr {
    id: number;
    student_id: number;
    level_id: number;
    location: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FolderInput extends Optional<FolderAttr, 'id'> { }
export interface FolderOutput extends Required<FolderAttr> { }

class Folder extends Model<FolderAttr, FolderInput> { }

Folder.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        level_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(250),
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
        modelName: 'Folder',
        tableName: 'folder',
    }
);

// Relationships
Folder.belongsTo(Student, { foreignKey: 'student_id' });
Student.hasMany(Folder, { foreignKey: 'student_id' });

// Folder.sync({ force: true })
// Folder.sync()
export default Folder;
