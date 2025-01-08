import { Column, Model, PrimaryKey, Table, DataType, Default } from 'sequelize-typescript';

@Table({ tableName: 'document' })
class Document extends Model<Document> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(70))
    declare name: string;

    @Column(DataType.STRING(250))
    declare description: string;
}
export default Document;
