import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import Municipality from './Municipality';

@Table({ tableName: 'state' })
class State extends Model<State> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Municipality)
    municipalities: Municipality[];
}
export default State;
