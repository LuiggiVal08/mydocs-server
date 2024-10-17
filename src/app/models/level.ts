import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import Folder from './folder';
import { UUID } from 'crypto';

interface LevelAttr {
    id: number;
    cabinet_id: UUID;
    name: string;
    capacity: number;
    status: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LevelInput extends Optional<LevelAttr, 'id'> {}
export interface LevelOutput extends Required<LevelAttr> {}

class Level extends Model<LevelAttr, LevelInput> {}

Level.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        cabinet_id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        capacity: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.BOOLEAN,
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
        modelName: 'Level',
        tableName: 'level',
    },
);

// Relaciones

Folder.belongsTo(Level, { foreignKey: 'level_id' });
Level.hasMany(Folder, { foreignKey: 'level_id' });
// Level.sync({ force: true })
// Level.sync()
export default Level;
