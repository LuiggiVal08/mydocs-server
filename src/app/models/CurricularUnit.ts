import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CourseAcademic, { CourseAcademicAttributes } from './CourseAcademic';

// Interface for CurricularUnit attributes
interface CurricularUnitAttributes {
    code: string;
    courseAcademicAt: string;
    name: string;
    credits: number;
    hte: number;
    htea: number;
    htei: number;
    weeklyHours: number;
    duration: number;
    minimumPassingGrade: number;
    minimumRecoveryGrade: number;
    minimumPerGrade: number;
    minimumAttendancePercentage: number;
    courseAcademic: CourseAcademicAttributes; //  trayecto
}

// Interface for CurricularUnit creation attributes
interface CurricularUnitCreationAttributes extends Omit<CurricularUnitAttributes, 'code' | 'courseAcademic'> {}

export { CurricularUnitAttributes, CurricularUnitCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'curricular_unit',
})
class CurricularUnit extends Model<CurricularUnitAttributes, CurricularUnitCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare code: string;

    @ForeignKey(() => CourseAcademic)
    @Column(DataType.UUID)
    declare courseAcademicAt: string;

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

    @BelongsTo(() => CourseAcademic)
    courseAcademic: CourseAcademic;
}
export default CurricularUnit;
