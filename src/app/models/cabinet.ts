import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';

interface CabinetAttr {
    id: number;
    name: string;
    status: string;
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
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
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
    }
);
// Cabinet.sync({force:true})
// Cabinet.sync()
export default Cabinet;
