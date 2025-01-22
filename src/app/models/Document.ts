import { Column, Model, PrimaryKey, Table, DataType, Default } from 'sequelize-typescript';

interface DocumentAttributes {
    id: string;
    name: string;
    description: string;
}

interface DocumentCreationAttributes extends Omit<DocumentAttributes, 'id'> {}

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
}
export default Document;
