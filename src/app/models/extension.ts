import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';

interface ExtensionAttr {
    id: number;
    name: string;
    format: string;
    definition: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ExtensionInput extends Optional<ExtensionAttr, 'id'> {}
export interface ExtensionOutput extends Required<ExtensionAttr> {}

class Extension extends Model<ExtensionAttr, ExtensionInput> {}

Extension.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(10),
        },
        format: {
            type: DataTypes.STRING(10),
        },
        definition: {
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
        modelName: 'Extension',
        tableName: 'extension',
    }
);
// Extension.sync({force:true})
// Extension.sync()

export default Extension;
