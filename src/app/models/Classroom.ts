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
import Building, { BuildingAttributes } from './Building';
import ClassSchedule, { ClassScheduleAttributes } from './ClassSchedule';

interface ClassroomAttributes {
    id: string;
    buildingId: string;
    name: string;
    type: string;
    building: BuildingAttributes;
    classSchedules: ClassScheduleAttributes[];
}

interface ClassroomCreationAttributes extends Omit<ClassroomAttributes, 'id' | 'building' | 'classSchedules'> {}

export { ClassroomAttributes, ClassroomCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'classroom',
})
class Classroom extends Model<ClassroomAttributes, ClassroomCreationAttributes> {
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

    @BelongsTo(() => Building, { onDelete: 'CASCADE' })
    building: Building;

    @HasMany(() => ClassSchedule, { onDelete: 'SET NULL' })
    classSchedules: ClassSchedule[];
}
export default Classroom;
