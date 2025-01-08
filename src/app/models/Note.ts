import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student from './Student';
import CoursePeriod from './CoursePeriod';

@Table({ tableName: 'note' })
class Note extends Model<Note> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Student)
    @Column(DataType.UUID)
    declare studentId: string;

    @ForeignKey(() => CoursePeriod)
    @Column(DataType.UUID)
    declare coursePeriodId: string;

    @Column(DataType.DECIMAL(5, 2))
    declare note: number;

    @Column(DataType.STRING(20))
    declare modality: string;

    @Column(DataType.DATE)
    declare registrationDate: Date;

    @Column(DataType.TEXT)
    declare observations: string;

    @BelongsTo(() => Student)
    student: Student;

    @BelongsTo(() => CoursePeriod)
    coursePeriod: CoursePeriod;
}
export default Note;
