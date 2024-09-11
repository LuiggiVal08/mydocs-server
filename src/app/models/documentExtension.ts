import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import Document from './document';
import Extension from './extension';

interface DocumentExtensionAttr {
    document_id: number;
    extension_id: number;
}

export interface DocumentExtensionInput extends Optional<DocumentExtensionAttr, 'document_id' | 'extension_id'> {}
export interface DocumentExtensionOutput extends Required<DocumentExtensionAttr> {}

class DocumentExtension extends Model<DocumentExtensionAttr, DocumentExtensionInput> {}

DocumentExtension.init(
    {
        document_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Document,
                key: 'id',
            },
        },
        extension_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Extension,
                key: 'id',
            },
        },
    },
    {
        sequelize: dbConn,
        modelName: 'DocumentExtension',
        tableName: 'document_extension',
    }
);

// Relationships
Document.belongsToMany(Extension, { through: DocumentExtension, foreignKey: 'document_id' });
Extension.belongsToMany(Document, { through: DocumentExtension, foreignKey: 'extension_id' });

// DocumentExtension.sync({force:true})
// DocumentExtension.sync()
export default DocumentExtension;
