import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import DocumentExtension from './DocumentExtension';

interface DocumentAttributes {
    id: string;
    name: string;
    description: string;
    documentExtensions?: DocumentExtension[];
}

interface DocumentCreationAttributes extends Omit<DocumentAttributes, 'id' | 'documentExtensions'> {}

export { DocumentAttributes, DocumentCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'document',
})
class Document extends Model<DocumentAttributes, DocumentCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(70))
    declare name: string;

    @Column(DataType.STRING(250))
    declare description: string;

    @HasMany(() => DocumentExtension, { onDelete: 'CASCADE' })
    documentExtensions: DocumentExtension[];
}
export default Document;
