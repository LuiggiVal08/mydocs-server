import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import Municipality from './municipality';

interface AddressAttr {
    id: number;
    municipality_id: number;
    address: string;
    // lat?: string;
    // lng?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AddressInput extends Optional<AddressAttr, 'id'> { }
export interface AddressOutput extends Required<AddressAttr> { }

class Address extends Model<AddressAttr, AddressInput> { }

Address.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        municipality_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Municipality,
                key: 'id',
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // lat: {
        //     type: DataTypes.STRING,
        // },
        // lng: {
        //     type: DataTypes.STRING,
        // },
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
        modelName: 'Address',
        tableName: 'Addresses',
    },
);

// Associations
Address.belongsTo(Municipality, { foreignKey: 'municipality_id' });
Municipality.hasMany(Address, { foreignKey: 'municipality_id' });
// Address.sync({ force: true })
// Address.sync()
export default Address;
