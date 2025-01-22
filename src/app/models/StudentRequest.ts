import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student from './Student';
import RequestType from './RequestType';

interface StudentRequestAttributes {
    id: string;
    studentId: string;
    requestId: string;
    status: string;
    requestDate: Date;
    student: Student;
    requestType: RequestType;
}

interface StudentRequestCreationAttributes
    extends Omit<StudentRequestAttributes, 'id' | 'status' | 'requestDate' | 'student' | 'requestType'> {}

export { StudentRequestAttributes, StudentRequestCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'student_request',
})
class StudentRequest extends Model<StudentRequestAttributes, StudentRequestCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Student)
    @Column(DataType.UUID)
    declare studentId: string;

    @ForeignKey(() => RequestType)
    @Column(DataType.UUID)
    declare requestId: string;

    @Default('Pending')
    @Column(DataType.STRING(50))
    declare status: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    declare requestDate: Date;

    @BelongsTo(() => Student)
    student: Student;

    @BelongsTo(() => RequestType)
    requestType: RequestType;
}
export default StudentRequest;
