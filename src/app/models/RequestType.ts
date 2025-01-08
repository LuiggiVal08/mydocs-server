import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import RequestGraduate from './RequestGraduate';
import StudentRequest from './StudentRequest';

@Table({ tableName: 'request_type' })
class RequestType extends Model<RequestType> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(20))
    declare name: string;

    @Column(DataType.FLOAT)
    declare cost: number;

    @HasMany(() => RequestGraduate)
    requestGraduates: RequestGraduate[];

    @HasMany(() => StudentRequest)
    studentRequests: StudentRequest[];
}
export default RequestType;
