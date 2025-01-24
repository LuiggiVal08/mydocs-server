import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CoursePeriod, { CoursePeriodAttributes } from './CoursePeriod';
import Student, { StudentAttributes } from './Student';

interface AttendanceAttributes {
    id: string;
    coursePeriodId: string;
    studentId: string;
    date: Date;
    status: string;
    observations: string;
    coursePeriod: CoursePeriodAttributes;
    student: StudentAttributes;
}

interface AttendanceCreationAttributes extends Omit<AttendanceAttributes, 'id' | 'coursePeriod' | 'student'> {}

export { AttendanceAttributes, AttendanceCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'attendance',
})
class Attendance extends Model<AttendanceAttributes, AttendanceCreationAttributes> {
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
