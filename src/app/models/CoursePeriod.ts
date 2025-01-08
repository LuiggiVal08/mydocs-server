import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CurricularUnit from './CurricularUnit';
import Section from './Section';
import AcademicPeriod from './AcademicPeriod';
import Administrator from './Administrator';

@Table({ tableName: 'course_period' })
class CoursePeriod extends Model<CoursePeriod> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => CurricularUnit)
    @Column(DataType.UUID)
    declare curricularUnitId: string;

    @ForeignKey(() => Section)
    @Column(DataType.UUID)
    declare sectionId: string;

    @ForeignKey(() => AcademicPeriod)
    @Column(DataType.UUID)
    declare academicPeriodId: string;

    @ForeignKey(() => Administrator)
    @Column(DataType.UUID)
    declare teacherId: string;

    @BelongsTo(() => CurricularUnit)
    curricularUnit: CurricularUnit;

    @BelongsTo(() => Section)
    section: Section;

    @BelongsTo(() => AcademicPeriod)
    academicPeriod: AcademicPeriod;

    @BelongsTo(() => Administrator)
    teacher: Administrator;
}
export default CoursePeriod;
