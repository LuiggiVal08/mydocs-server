import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import RequestGraduate, { RequestGraduateAttributes } from './RequestGraduate';
import StudentRequest, { StudentRequestAttributes } from './StudentRequest';

// Interface for the attributes of the RequestType entity
interface RequestTypeAttributes {
    id: string;
    name: string;
    cost: number;
    requestGraduates?: RequestGraduateAttributes[];
    studentRequests?: StudentRequestAttributes[];
}

// Interface for the creation attributes of the RequestType entity
interface RequestTypeCreationAttributes
    extends Omit<RequestTypeAttributes, 'id' | 'requestGraduates' | 'studentRequests'> {}

// Export the interfaces
export { RequestTypeAttributes, RequestTypeCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'request_type',
})
class RequestType extends Model<RequestTypeAttributes, RequestTypeCreationAttributes> {
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
