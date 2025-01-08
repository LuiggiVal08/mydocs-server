import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import DocumentExtension from './DocumentExtension';
import Folder from './Folder';

@Table({ tableName: 'document_folder' })
class DocumentFolder extends Model<DocumentFolder> {
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
