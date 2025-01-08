import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Graduate from './Graduate';
import Payment from './Payment';
import RequestType from './RequestType';

@Table({ tableName: 'request_graduate' })
class RequestGraduate extends Model<RequestGraduate> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Graduate)
    @Column(DataType.UUID)
    declare graduateId: string;

    @ForeignKey(() => Payment)
    @Column(DataType.UUID)
    declare paymentId: string;

    @ForeignKey(() => RequestType)
    @Column(DataType.UUID)
    declare requestTypeId: string;

    @Column(DataType.DATE)
    declare requestDate: Date;

    @Column(DataType.STRING(20))
    declare requestStatus: string;

    @BelongsTo(() => Graduate)
    graduate: Graduate;

    @BelongsTo(() => Payment)
    payment: Payment;

    @BelongsTo(() => RequestType)
    requestType: RequestType;
}
export default RequestGraduate;
