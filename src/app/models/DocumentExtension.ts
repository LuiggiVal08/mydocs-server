import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Document from './Document';
import Extension from './Extension';

interface DocumentExtensionAttributes {
    id: string;
    documentId: string;
    extensionId: string;
    document: Document;
    extension: Extension;
}

interface DocumentExtensionCreationAttributes
    extends Omit<DocumentExtensionAttributes, 'id' | 'document' | 'extension'> {}
export { DocumentExtensionAttributes, DocumentExtensionCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'document_extension',
})
class DocumentExtension extends Model<DocumentExtensionAttributes, DocumentExtensionCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Document)
    @Column(DataType.UUID)
    declare documentId: string;

    @ForeignKey(() => Extension)
    @Column(DataType.UUID)
    declare extensionId: string;

    @BelongsTo(() => Document)
    document: Document;

    @BelongsTo(() => Extension)
    extension: Extension;
}
export default DocumentExtension;
