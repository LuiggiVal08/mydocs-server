// models/state.ts
import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';

interface StateAttr {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface StateInput extends Optional<StateAttr, 'id'> {}
export interface StateOutput extends Required<StateAttr> {}

class State extends Model<StateAttr, StateInput> {}

State.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'State',
        tableName: 'States',
    },
);
// State.sync({force:true})
// State.sync()
export default State;
