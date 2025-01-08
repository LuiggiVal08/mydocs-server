import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Classroom from './Classroom';
import CoursePeriod from './CoursePeriod';

@Table({ tableName: 'class_schedule' })
class ClassSchedule extends Model<ClassSchedule> {
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
