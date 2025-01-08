import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import Level from './Level';

@Table({ tableName: 'file_cabinet' })
class FileCabinet extends Model<FileCabinet> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(60))
    declare name: string;

    @Column(DataType.STRING(60))
    declare status: string;

    @Column(DataType.TEXT)
    declare location: string;

    @HasMany(() => Level)
    levels: Level[];
}
export default FileCabinet;
