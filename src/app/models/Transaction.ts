import { Table, Column, Model, PrimaryKey, ForeignKey, DataType } from 'sequelize-typescript';

import Payment from './Payment';
import RequestGraduate from './RequestGraduate';
import PaymentAccount from './PaymentAccount';

// Define the attributes for the Transaction model
interface TransactionAttributes {
    id: string;
    payment_id: string;
    request_id: string;
    payment_account_id: number;
    transaction_date: Date;
    transaction_amount: number;
}

// Define the attributes for creating a new Transaction
interface TransactionCreationAttributes extends Omit<TransactionAttributes, 'id'> {}

// Define the Transaction model using sequelize-typescript
@Table({
    timestamps: true,
    tableName: 'transactions',
})
export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare id: string;

    @ForeignKey(() => Payment)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    payment_id!: string;

    @ForeignKey(() => RequestGraduate)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    request_id!: string;

    @ForeignKey(() => PaymentAccount)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    payment_account_id!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    transaction_date!: Date;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    transaction_amount!: number;
}

// Assuming Payment, RequestGraduate, and PaymentAccount models are defined elsewhere
