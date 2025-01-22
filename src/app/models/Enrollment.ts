import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student, { StudentAttributes } from './Student';
import CoursePeriod, { CoursePeriodAttributes } from './CoursePeriod';
import Administrator, { AdministratorAttributes } from './Administrator';

interface EnrollmentAttributes {
    id: string;
    studentId: string;
    coursePeriodId: string;
    administratorId: string;
    registrationDate: Date;
    status: string;
    observations: string;
    student: StudentAttributes;
    coursePeriod: CoursePeriodAttributes;
    administrator: AdministratorAttributes;
}

interface EnrollmentCreationAttributes
    extends Omit<EnrollmentAttributes, 'id' | 'student' | 'coursePeriod' | 'administrator'> {}

export { EnrollmentAttributes, EnrollmentCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'enrollment',
})
class Enrollment extends Model<EnrollmentAttributes, EnrollmentCreationAttributes> {
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
