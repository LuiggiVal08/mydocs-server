import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import Folder from './folder';
import Document from './document';

interface FolderDocumentAttr {
    id: number;
    folder_id: number;
    document_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FolderDocumentInput extends Optional<FolderDocumentAttr, 'id'> {}
export interface FolderDocumentOutput extends Required<FolderDocumentAttr> {}

class FolderDocument extends Model<FolderDocumentAttr, FolderDocumentInput> {}

FolderDocument.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        folder_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Folder,
                key: 'id',
            },
        },
        document_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Document,
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
        modelName: 'FolderDocument',
        tableName: 'folder_document',
    }
);

// Relationships
Folder.hasMany(FolderDocument, { foreignKey: 'folder_id' });
FolderDocument.belongsTo(Folder, { foreignKey: 'folder_id' });
Document.hasMany(FolderDocument, { foreignKey: 'document_id' });
FolderDocument.belongsTo(Document, { foreignKey: 'document_id' });
// FolderDocument.sync({force:true})
// FolderDocument.sync()
export default FolderDocument;
