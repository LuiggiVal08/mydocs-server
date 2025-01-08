import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Document from './Document';
import Extension from './Extension';

@Table({ tableName: 'document_extension' })
class DocumentExtension extends Model<DocumentExtension> {
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
