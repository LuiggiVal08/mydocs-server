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
import Building from './Building';
import ClassSchedule from './ClassSchedule';

@Table({ tableName: 'classroom' })
class Classroom extends Model<Classroom> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Building)
    @Column(DataType.UUID)
    declare buildingId: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare type: string;

    @BelongsTo(() => Building)
    building: Building;

    @HasMany(() => ClassSchedule)
    classSchedules: ClassSchedule[];
}
export default Classroom;
