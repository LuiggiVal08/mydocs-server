import { Table, Column, Model, DataType, PrimaryKey, HasMany } from 'sequelize-typescript';
import Building from './Building';
import Pnf from './Pnf';

// Interface for Core attributes
export interface CoreAttributes {
    id: string;
    name: string;
    email: string;
    phone: string;
    buildings: Building[];
    pnfs: Pnf[];
}

// Interface for Core creation attributes
export interface CoreCreationAttributes extends Omit<CoreAttributes, 'id' | 'buildings' | 'pnfs'> {}

// Core model definition
@Table({
    timestamps: true,
    tableName: 'core',
})
class Core extends Model<CoreAttributes, CoreCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone!: string;

    @HasMany(() => Building, { onDelete: 'CASCADE' })
    buildings: Building[];

    @HasMany(() => Pnf, { onDelete: 'CASCADE' })
    pnfs: Pnf[];
}
export default Core;
