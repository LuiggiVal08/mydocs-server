import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import CoursePeriod, { CoursePeriodAttributes } from './CoursePeriod';

interface AcedemiPeriodAttributes {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    coursePeriods?: CoursePeriodAttributes[];
}

interface AcademicPeriodAttributesCreate extends Omit<AcedemiPeriodAttributes, 'id' | 'coursePeriods'> {}
export { AcedemiPeriodAttributes, AcademicPeriodAttributesCreate };
@Table({
    timestamps: true,
    tableName: 'academic_period',
})
class AcademicPeriod extends Model<AcedemiPeriodAttributes, AcademicPeriodAttributesCreate> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.DATE)
    declare startDate: Date;

    @Column(DataType.DATE)
    declare endDate: Date;

    @HasMany(() => CoursePeriod, { onDelete: 'SET NULL' })
    coursePeriods: CoursePeriod[];
}
export default AcademicPeriod;
