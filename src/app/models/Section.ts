import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import CoursePeriod from './CoursePeriod';

@Table({ tableName: 'section' })
export class Section extends Model<Section> {
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

    @HasMany(() => CoursePeriod)
    coursePeriods: CoursePeriod[];
}
export default Section;
