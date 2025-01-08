import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Route from './Route';

@Table({ tableName: 'curricular_unit' })
class CurricularUnit extends Model<CurricularUnit> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare code: string;

    @ForeignKey(() => Route)
    @Column(DataType.UUID)
    declare routeId: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.INTEGER)
    declare credits: number;

    @Column(DataType.INTEGER)
    declare hte: number;

    @Column(DataType.INTEGER)
    declare htea: number;

    @Column(DataType.INTEGER)
    declare htei: number;

    @Column(DataType.INTEGER)
    declare weeklyHours: number;

    @Column(DataType.INTEGER)
    declare duration: number;

    @Column(DataType.DECIMAL(5, 2))
    declare minimumPassingGrade: number;

    @Column(DataType.DECIMAL(5, 2))
    declare minimumRecoveryGrade: number;

    @Column(DataType.DECIMAL(5, 2))
    declare minimumPerGrade: number;

    @Column(DataType.DECIMAL(5, 2))
    declare minimumAttendancePercentage: number;

    @BelongsTo(() => Route)
    route: Route;
}
export default CurricularUnit;
