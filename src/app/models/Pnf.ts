import {
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    Default,
    HasMany,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import Graduate, { GraduateAttributes } from './Graduate';
import CourseAcademic, { CourseAcademicAttributes } from './CourseAcademic';
import Core, { CoreAttributes } from './Core';

// Interface for Pnf attributes
interface PnfAttributes {
    id: string;
    name: string;
    description: string;
    periodicity: string;
    coreId: string;
    core: CoreAttributes;
    graduates: GraduateAttributes[];
    courseAcademic: CourseAcademicAttributes[];
}

// Interface for Pnf creation attributes
interface PnfCreationAttributes extends Omit<PnfAttributes, 'id' | 'graduates' | 'courseAcademic' | 'core'> {}
export { PnfAttributes, PnfCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'pnf',
})
class Pnf extends Model<PnfAttributes, PnfCreationAttributes> {
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

    @ForeignKey(() => Core)
    @Column(DataType.UUID)
    coreId: string;

    @BelongsTo(() => Core)
    core: Core;

    @HasMany(() => Graduate, { onDelete: 'RESTRICT' })
    graduates: Graduate[];

    @HasMany(() => CourseAcademic, { onDelete: 'CASCADE' })
    courseAcademic: CourseAcademic[];
}
export default Pnf;
