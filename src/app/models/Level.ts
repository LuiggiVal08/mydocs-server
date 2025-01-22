import {
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    Default,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import FileCabinet, { FileCabinetAttributes } from './FileCabinet';
import Folder from './Folder';

interface LevelAttributes {
    id: string;
    fileCabinetId: string;
    name: string;
    capacity: number;
    status: boolean;
    fileCabinet: FileCabinetAttributes;
}

interface LevelCreationAttributes extends Omit<LevelAttributes, 'id' | 'fileCabinet'> {}

export { LevelAttributes, LevelCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'level',
})
class Level extends Model<LevelAttributes, LevelCreationAttributes> {
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

    @BelongsTo(() => FileCabinet, { onDelete: 'CASCADE' })
    fileCabinet: FileCabinet;

    @HasMany(() => Folder, { onDelete: 'RESTRICT' })
    folders: Folder[];
}
export default Level;
