import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import { UUID } from 'crypto';
import User from './user';
import Role from './role';

interface AdminAttr {
    id: UUID;
    user_id: UUID;
    role: number;
    status?: boolean;
    token?: string; // Campo para el token
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AdminInput extends Optional<AdminAttr, 'id'> { }
export interface AdminOuput extends Required<AdminAttr> { }

class Admin extends Model<AdminAttr, AdminInput> { }

Admin.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            type: DataTypes.UUID,
        },
        user_id: {
            type: DataTypes.UUID,
        },
        role: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.BOOLEAN, // @true : active | false : inactive
        },
        token: {
            type: DataTypes.STRING, // Definir el token como una cadena de texto
            allowNull: true, // El token puede no ser obligatorio inicialmente
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
        modelName: 'Admin',
        tableName: 'Admins',
    },
);

// Definir relaciones
Admin.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Admin, { foreignKey: 'user_id' });
Admin.belongsTo(Role, { foreignKey: 'role' });
Role.hasMany(Admin, { foreignKey: 'role' });

// Admin.sync({ force: true });
// Admin.sync();

export default Admin;
