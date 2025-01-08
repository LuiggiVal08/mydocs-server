import { Column, Model, PrimaryKey, Table, DataType, Default } from 'sequelize-typescript';

@Table({ tableName: 'detail_payment' })
class DetailPayment extends Model<DetailPayment> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(20))
    declare type: string;

    @Column(DataType.STRING(50))
    declare bank: string;

    @Column(DataType.STRING(15))
    declare phoneNumber: string;

    @Column(DataType.STRING(60))
    declare holderName: string;

    @Column(DataType.STRING(60))
    declare holderLastName: string;

    @Column(DataType.STRING(20))
    declare accountNumber: string;

    @Column(DataType.STRING(20))
    declare identityCard: string;
}
export default DetailPayment;
