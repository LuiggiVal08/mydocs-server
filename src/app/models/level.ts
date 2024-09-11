import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import Cabinet from './cabinet';

interface LevelAttr {
    id: number;
    cabinet_id: number;
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
            type: DataTypes.INTEGER,
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
    }
);

// Relaciones
Level.belongsTo(Cabinet, { foreignKey: 'cabinet_id' });
Cabinet.hasMany(Level, { foreignKey: 'cabinet_id' });
// Level.sync({force:true})
// Level.sync()
export default Level;
