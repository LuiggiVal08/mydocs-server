import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import Graduate from './Graduate';
import Route from './Route';

@Table({ tableName: 'pnf' })
class Pnf extends Model<Pnf> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare description: string;

    @Column(DataType.STRING(20))
    declare periodicity: string;

    @HasMany(() => Graduate)
    graduates: Graduate[];

    @HasMany(() => Route)
    routes: Route[];
}
export default Pnf;
