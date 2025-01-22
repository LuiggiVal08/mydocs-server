import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CurricularUnit, { CurricularUnitAttributes } from './CurricularUnit';
import Section, { SectionAttributes } from './Section';
import AcademicPeriod, { AcedemiPeriodAttributes } from './AcademicPeriod';
import Administrator, { AdministratorAttributes } from './Administrator';

// Interface for the attributes of the CoursePeriod entity
interface CoursePeriodAttributes {
    id: string;
    curricularUnitId: string;
    sectionId: string;
    academicPeriodId: string;
    teacherId: string;
    curricularUnit: CurricularUnitAttributes;
    section: SectionAttributes;
    academicPeriod: AcedemiPeriodAttributes;
    teacher: AdministratorAttributes;
}

// Interface for the creation attributes of the CoursePeriod entity
interface CoursePeriodCreationAttributes
    extends Omit<CoursePeriodAttributes, 'id' | 'curricularUnit' | 'section' | 'academicPeriod' | 'teacher'> {}

export { CoursePeriodAttributes, CoursePeriodCreationAttributes };
// Update the CoursePeriod class to implement the interfaces
@Table({
    timestamps: true,
    tableName: 'course_period',
})
class CoursePeriod extends Model<CoursePeriodAttributes, CoursePeriodCreationAttributes> {
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
