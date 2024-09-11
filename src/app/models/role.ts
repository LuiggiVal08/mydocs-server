import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
// import Admin from './admin';

interface RoleAttr {
    id: number;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RoleInput extends Optional<RoleAttr, 'id'> {}
export interface RoleOuput extends Required<RoleAttr> {}

class Role extends Model<RoleAttr, RoleInput> {}

Role.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
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
        modelName: 'Role',
        tableName: 'Roles',
    },
);

// Role.sync({force:true})
// Role.sync()

export default Role;
