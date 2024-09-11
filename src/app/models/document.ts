import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';

interface DocumentAttr {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DocumentInput extends Optional<DocumentAttr, 'id'> {}
export interface DocumentOutput extends Required<DocumentAttr> {}

class Document extends Model<DocumentAttr, DocumentInput> {}

Document.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(70),
        },
        description: {
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
        modelName: 'Document',
        tableName: 'document',
    }
);
// Document.sync({force:true})
// Document.sync()
export default Document;
