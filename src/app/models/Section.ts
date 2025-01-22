import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import CoursePeriod, { CoursePeriodAttributes } from './CoursePeriod';

interface SectionAttributes {
    id: string;
    name: string;
    classroom: string;
    capacity: number;
    status: boolean;
    coursePeriods: CoursePeriodAttributes[];
}

interface SectionCreationAttributes extends Omit<SectionAttributes, 'id' | 'coursePeriods'> {}

export { SectionAttributes, SectionCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'section',
})
export class Section extends Model<SectionAttributes, SectionCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(50))
    declare name: string;

    @Column(DataType.STRING(50))
    declare classroom: string;

    @Column(DataType.INTEGER)
    declare capacity: number;

    @Column(DataType.BOOLEAN)
    declare status: boolean;

    @HasMany(() => CoursePeriod, { onDelete: 'CASCADE' })
    coursePeriods: CoursePeriod[];
}
export default Section;
