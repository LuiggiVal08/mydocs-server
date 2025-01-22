import { Table, Column, Model, PrimaryKey, DataType, Default, Index, ForeignKey } from 'sequelize-typescript';

import Currency from './Currencies';

// Interface for the attributes of the RatesChanges entity
export interface RatesChangesAttributes {
    id: string;
    currencySourceId: string;
    currencyDestinationId: string;
    rate: number;
    updateDate: Date;
}

// Interface for the creation attributes of the RatesChanges entity
export interface RatesChangesCreationAttributes extends Omit<RatesChangesAttributes, 'id' | 'updateDate'> {}

@Table({
    timestamps: true,
    tableName: 'rates_changes',
})
class RatesChanges extends Model<RatesChangesAttributes, RatesChangesCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @ForeignKey(() => Currency)
    @Index({
        name: 'currency_source_destination_unique',
        unique: true,
    })
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    currencySourceId!: string;

    @ForeignKey(() => Currency)
    @Index({
        name: 'currency_source_destination_unique',
        unique: true,
    })
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    currencyDestinationId!: string;

    @Column({
        type: DataType.DECIMAL(10, 6),
        allowNull: false,
    })
    rate!: number;

    @Default(DataType.NOW)
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updateDate!: Date;
}
export default RatesChanges;
