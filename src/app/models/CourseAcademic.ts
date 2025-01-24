import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany, ForeignKey } from 'sequelize-typescript';
import Pnf from './Pnf';
import CurricularUnit, { CurricularUnitAttributes } from './CurricularUnit';

interface CourseAcademicAttributes {
    id: string;
    pnfId: string;
    name: string;
    duration: number;
    curricularUnits?: CurricularUnitAttributes[];
}

interface CourseAcademicCreationAttributes extends Omit<CourseAcademicAttributes, 'id' | 'curricularUnits'> {}

export { CourseAcademicAttributes, CourseAcademicCreationAttributes };

@Table({
    timestamps: true,
    tableName: 'course_academic',
})
class CourseAcademic extends Model<CourseAcademicAttributes, CourseAcademicCreationAttributes> {
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

    @HasMany(() => CurricularUnit, { onDelete: 'CASCADE' })
    curricularUnits: CurricularUnit[];
}
export default CourseAcademic;
