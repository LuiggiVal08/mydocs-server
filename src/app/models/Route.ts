import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany, ForeignKey } from 'sequelize-typescript';
import Pnf from './Pnf';
import CurricularUnit from './CurricularUnit';

@Table({ tableName: 'route' })
class Route extends Model<Route> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Pnf)
    @Column(DataType.UUID)
    declare pnfId: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.INTEGER)
    declare duration: number;

    @HasMany(() => CurricularUnit)
    curricularUnits: CurricularUnit[];
}
export default Route;
