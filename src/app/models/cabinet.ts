import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import Level from './level';
import { UUID } from 'crypto';

interface CabinetAttr {
    id: UUID;
    name: string;
    status: boolean;
    location: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CabinetInput extends Optional<CabinetAttr, 'id'> {}
export interface CabinetOutput extends Required<CabinetAttr> {}

class Cabinet extends Model<CabinetAttr, CabinetInput> {}

Cabinet.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            // autoIncrement: true,
            type: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
        location: {
            type: DataTypes.STRING,
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
        modelName: 'Cabinet',
        tableName: 'cabinet',
    },
);
Level.belongsTo(Cabinet, { foreignKey: 'cabinet_id' });
Cabinet.hasMany(Level, { foreignKey: 'cabinet_id' });
// Cabinet.sync({ force: true });
// Cabinet.sync()
export default Cabinet;
