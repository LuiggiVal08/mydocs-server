import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import { UUID } from 'crypto';
import { hashPassword } from '../../helpers/crypto';
import Gender from './gender';
import Address from './address';

interface UserAttr {
    id: UUID;
    dni: string | number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    gender_id: number | string;
    address_id?: number | string;  // Optional, as not all users may have an address
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttr, 'id'> {}
export interface UserOutput extends Required<UserAttr> {}

class User extends Model<UserAttr, UserInput> {}

User.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        dni: DataTypes.STRING,
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        username: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        gender_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Gender,
                key: 'id',
            },
        },
        address_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Address,
                key: 'id',
            },
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
        timestamps: true,
        modelName: 'User',
        tableName: 'Users',
        hooks: {
            beforeCreate: async (user, _options) => {
                const hashPass = await hashPassword(user.dataValues.password);
                if (hashPass !== null) {
                    user.dataValues.password = hashPass;
                }
            },
        },
    },
);

// Associations
User.belongsTo(Gender, { foreignKey: 'gender_id' });
User.belongsTo(Address, { foreignKey: 'address_id' });

Gender.hasMany(User, { foreignKey: 'gender_id' });
Address.hasOne(User, { foreignKey: 'address_id' });

// User.sync({force:true}); // Ensure this is used carefully to avoid data loss
// User.sync(); // Ensure this is used carefully to avoid data loss
export default User;
