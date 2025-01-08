import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student from './Student';
import CoursePeriod from './CoursePeriod';
import Administrator from './Administrator';

@Table({ tableName: 'enrollment' })
class Enrollment extends Model<Enrollment> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Student)
    @Column(DataType.UUID)
    declare studentId: string;

    @ForeignKey(() => CoursePeriod)
    @Column(DataType.UUID)
    declare coursePeriodId: string;

    @ForeignKey(() => Administrator)
    @Column(DataType.UUID)
    declare administratorId: string;

    @Column(DataType.DATE)
    declare registrationDate: Date;

    @Column(DataType.STRING(20))
    declare status: string;

    @Column(DataType.TEXT)
    declare observations: string;

    @BelongsTo(() => Student)
    student: Student;

    @BelongsTo(() => CoursePeriod)
    coursePeriod: CoursePeriod;

    @BelongsTo(() => Administrator)
    administrator: Administrator;
}
export default Enrollment;
