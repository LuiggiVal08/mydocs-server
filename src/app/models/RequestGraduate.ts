import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Graduate, { GraduateAttributes } from './Graduate';
import Payment, { PaymentAttributes } from './Payment';
import RequestType, { RequestTypeAttributes } from './RequestType';

// Interface for the attributes of the RequestGraduate entity
interface RequestGraduateAttributes {
    id: string;
    graduateId: string;
    paymentId: string;
    requestTypeId: string;
    requestDate: Date;
    requestStatus: string;
    graduate: GraduateAttributes;
    payment: PaymentAttributes;
    requestType: RequestTypeAttributes;
}

// Interface for the creation attributes of the RequestGraduate entity
interface RequestGraduateCreationAttributes
    extends Omit<RequestGraduateAttributes, 'id' | 'graduate' | 'payment' | 'requestType'> {}

export { RequestGraduateAttributes, RequestGraduateCreationAttributes };

@Table({
    timestamps: true,
    tableName: 'request_graduate',
})
class RequestGraduate extends Model<RequestGraduateAttributes, RequestGraduateCreationAttributes> {
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

    @Default('Pending')
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
