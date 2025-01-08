import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import FileCabinet from './FileCabinet';

@Table({ tableName: 'level' })
class Level extends Model<Level> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => FileCabinet)
    @Column(DataType.UUID)
    declare fileCabinetId: string;

    @Column(DataType.STRING(60))
    declare name: string;

    @Column(DataType.INTEGER)
    declare capacity: number;

    @Column(DataType.BOOLEAN)
    declare status: boolean;

    @BelongsTo(() => FileCabinet)
    fileCabinet: FileCabinet;
}
export default Level;
