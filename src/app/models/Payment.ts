import { Column, Model, PrimaryKey, Table, DataType, Default } from 'sequelize-typescript';

// Define the attributes for the Payment model
interface PaymentAttributes {
    id: string;
    amount: number;
    paymentStatus: 'Pending' | 'Completed' | 'Failed';
    notes?: string;
}

// Define the creation attributes for the Payment model
interface PaymentCreationAttributes extends Omit<PaymentAttributes, 'id' | 'paymentStatus'> {}
export { PaymentAttributes, PaymentCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'payments',
})
class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare amount: number;

    @Default('Pending')
    @Column({
        type: DataType.ENUM('Pending', 'Completed', 'Failed'),
        allowNull: false,
    })
    declare paymentStatus: 'Pending' | 'Completed' | 'Failed';

    @Column(DataType.TEXT)
    declare notes?: string;
}

export default Payment;
