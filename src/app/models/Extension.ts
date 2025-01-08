import { Column, Model, PrimaryKey, Table, DataType, Default } from 'sequelize-typescript';

@Table({ tableName: 'extension' })
class Extension extends Model<Extension> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(10))
    declare name: string;
}
export default Extension;
