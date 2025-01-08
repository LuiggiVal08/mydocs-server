import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import CoursePeriod from './CoursePeriod';

@Table({ tableName: 'academic_period' })
class AcademicPeriod extends Model<AcademicPeriod> {
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

    @HasMany(() => CoursePeriod)
    coursePeriods: CoursePeriod[];
}
export default AcademicPeriod;
