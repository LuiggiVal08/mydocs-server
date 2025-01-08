import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CoursePeriod from './CoursePeriod';
import Student from './Student';

@Table({ tableName: 'attendance' })
class Attendance extends Model<Attendance> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => CoursePeriod)
    @Column(DataType.UUID)
    declare coursePeriodId: string;

    @ForeignKey(() => Student)
    @Column(DataType.UUID)
    declare studentId: string;

    @Column(DataType.DATE)
    declare date: Date;

    @Column(DataType.STRING(20))
    declare status: string;

    @Column(DataType.TEXT)
    declare observations: string;

    @BelongsTo(() => CoursePeriod)
    coursePeriod: CoursePeriod;

    @BelongsTo(() => Student)
    student: Student;
}

export default Attendance;
