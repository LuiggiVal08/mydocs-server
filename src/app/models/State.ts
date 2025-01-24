import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import Municipality, { MunicipalityAttributes } from './Municipality';

interface StateAttributes {
    id: string;
    name: string;
    municipalities?: MunicipalityAttributes[];
}

interface StateCreationAttributes extends Omit<StateAttributes, 'id' | 'municipalities'> {}

export { StateAttributes, StateCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'state',
})
class State extends Model<StateAttributes, StateCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Municipality, { onDelete: 'CASCADE' })
    municipalities: Municipality[];
}

export default State;
