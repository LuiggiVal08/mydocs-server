import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import DetailPayment from './DetailPayment';

@Table({ tableName: 'payment' })
class Payment extends Model<Payment> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => DetailPayment)
    @Column(DataType.UUID)
    declare detailId: string;

    @Column(DataType.FLOAT)
    declare amount: number;

    @Column(DataType.DATE)
    declare paymentDate: Date;

    @Column(DataType.STRING(20))
    declare paymentStatus: string;

    @BelongsTo(() => DetailPayment)
    detailPayment: DetailPayment;
}
export default Payment;
