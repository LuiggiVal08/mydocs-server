import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import DocumentExtension, { DocumentExtensionAttributes } from './DocumentExtension';
import Folder, { FolderAttributes } from './Folder';

// Interface for the attributes of the DocumentFolder entity
interface DocumentFolderAttributes {
    id: string;
    documentExtensionId: string;
    folderId: string;
    url: string;
    documentExtension: DocumentExtensionAttributes;
    folder: FolderAttributes;
}

// Interface for the creation attributes of the DocumentFolder entity
interface DocumentFolderCreationAttributes extends Omit<DocumentFolderAttributes, 'id'> {}

@Table({
    timestamps: true,
    tableName: 'document_folder',
})
class DocumentFolder extends Model<DocumentFolderAttributes, DocumentFolderCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => DocumentExtension)
    @Column(DataType.UUID)
    declare documentExtensionId: string;

    @ForeignKey(() => Folder)
    @Column(DataType.UUID)
    declare folderId: string;

    @Column(DataType.STRING(250))
    declare url: string;

    @BelongsTo(() => DocumentExtension)
    documentExtension: DocumentExtension;

    @BelongsTo(() => Folder)
    folder: Folder;
}
export default DocumentFolder;
