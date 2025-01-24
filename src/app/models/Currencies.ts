import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    Default,
    HasMany,
} from 'sequelize-typescript';
import RatesChanges from './RatesChanges';

// Interface for Currency attributes
interface CurrencyAttributes {
    id: number;
    name: string;
    symbol: string;
    status: boolean;
    ratesChanges?: RatesChanges[];
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

    @HasMany(() => RatesChanges, { onDelete: 'CASCADE' })
    ratesChanges: RatesChanges[];
}
export default Currency;
