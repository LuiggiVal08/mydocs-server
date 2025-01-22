import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

// Interface for PaymentTypes attributes
export interface PaymentTypesAttributes {
    id: string;
    name: string;
    description?: string;
}

// Interface for PaymentTypes creation attributes
export interface PaymentTypesCreationAttributes extends Omit<PaymentTypesAttributes, 'id'> {}

@Table({
    tableName: 'payment_types',
    timestamps: true,
})
class PaymentTypes extends Model<PaymentTypesAttributes, PaymentTypesCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare id: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: true,
    })
    description?: string;
}
export default PaymentTypes;
