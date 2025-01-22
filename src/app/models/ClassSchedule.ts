import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Classroom, { ClassroomAttributes } from './Classroom';
import CoursePeriod, { CoursePeriodAttributes } from './CoursePeriod';

// Interface for ClassSchedule attributes
interface ClassScheduleAttributes {
    id: string;
    classroomId: string;
    courseId: string;
    type: string;
    weekDay: string;
    startTime: string;
    endTime: string;
    classroom: ClassroomAttributes;
    coursePeriod: CoursePeriodAttributes;
}

// Interface for ClassSchedule creation attributes
interface ClassScheduleCreationAttributes extends Omit<ClassScheduleAttributes, 'id' | 'classroom' | 'coursePeriod'> {}

// Exporting the interfaces
export { ClassScheduleAttributes, ClassScheduleCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'class_schedule',
})
class ClassSchedule extends Model<ClassScheduleAttributes, ClassScheduleCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Classroom)
    @Column(DataType.UUID)
    declare classroomId: string;

    @ForeignKey(() => CoursePeriod)
    @Column(DataType.UUID)
    declare courseId: string;

    @Column(DataType.STRING(20))
    declare type: string;

    @Column(DataType.STRING(20))
    declare weekDay: string;

    @Column(DataType.TIME)
    declare startTime: string;

    @Column(DataType.TIME)
    declare endTime: string;

    @BelongsTo(() => Classroom)
    classroom: Classroom;

    @BelongsTo(() => CoursePeriod)
    coursePeriod: CoursePeriod;
}
export default ClassSchedule;
