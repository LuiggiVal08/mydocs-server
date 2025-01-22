import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, Default } from 'sequelize-typescript';

// Interface for Currency attributes
interface CurrencyAttributes {
    id: number;
    name: string;
    symbol: string;
    status: boolean;
}

// Interface for Currency creation attributes
interface CurrencyCreationAttributes extends Omit<CurrencyAttributes, 'id' | 'status'> {}

// Currency model definition
@Table({
    timestamps: true,
    tableName: 'currencies',
})
class Currency extends Model<CurrencyAttributes, CurrencyCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    symbol!: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    status!: boolean;
}
export default Currency;
