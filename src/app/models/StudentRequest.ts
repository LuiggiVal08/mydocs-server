import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student from './Student';
import RequestType from './RequestType';

@Table({ tableName: 'student_request' })
class StudentRequest extends Model<StudentRequest> {
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

    @Column(DataType.STRING(50))
    declare status: string;

    @Column(DataType.DATE)
    declare requestDate: Date;

    @BelongsTo(() => Student)
    student: Student;

    @BelongsTo(() => RequestType)
    requestType: RequestType;
}
export default StudentRequest;
