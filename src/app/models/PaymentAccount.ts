import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey } from 'sequelize-typescript';
import PaymentTypes from './PaymentTypes';
import Currency from './Currencies';

// Interface for the entity attributes
interface PaymentAccountAttributes {
    id: number;
    paymentTypeId: number;
    currencyId: number;
    accountName: string;
    accountNumber: string;
    bank: string;
    documentType: 'V' | 'E' | 'J' | 'P' | null;
    document: string;
}

// Interface for the creation attributes
interface PaymentAccountCreationAttributes extends Omit<PaymentAccountAttributes, 'id'> {}

@Table({
    timestamps: true,
    tableName: 'payment_accounts',
})
class PaymentAccount extends Model<PaymentAccountAttributes, PaymentAccountCreationAttributes> {
    @PrimaryKey
    @Default(DataType.INTEGER)
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => PaymentTypes)
    @Column(DataType.INTEGER)
    declare paymentTypeId: number;

    @ForeignKey(() => Currency)
    @Column(DataType.INTEGER)
    declare currencyId: number;

    @Column(DataType.STRING)
    declare accountName: string;

    @Column(DataType.STRING)
    declare accountNumber: string;

    @Column(DataType.STRING)
    declare bank: string;

    @Column(DataType.ENUM('V', 'E', 'J', 'P'))
    declare documentType: 'V' | 'E' | 'J' | 'P' | null;

    @Column(DataType.STRING)
    declare document?: string;
}

export default PaymentAccount;
