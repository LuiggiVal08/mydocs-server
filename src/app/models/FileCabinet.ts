import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import Level, { LevelAttributes } from './Level';

interface FileCabinetAttributes {
    id: string;
    name: string;
    status: string;
    location: string;
    levels: LevelAttributes[];
}

interface FileCabinetCreationAttributes extends Omit<FileCabinetAttributes, 'id' | 'levels'> {}

export { FileCabinetAttributes, FileCabinetCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'file_cabinet',
})
class FileCabinet extends Model<FileCabinetAttributes, FileCabinetCreationAttributes> {
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

    @HasMany(() => Level, { onDelete: 'CASCADE' })
    levels: Level[];
}
export default FileCabinet;
