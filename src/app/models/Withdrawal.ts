import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student from './Student';
import Administrator from './Administrator';

@Table({ tableName: 'withdrawal' })
class Withdrawal extends Model<Withdrawal> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Student)
    @Column(DataType.UUID)
    declare studentId: string;

    @ForeignKey(() => Administrator)
    @Column(DataType.UUID)
    declare administratorId: string;

    @Column(DataType.DATE)
    declare withdrawalDate: Date;

    @Column(DataType.STRING(255))
    declare reason: string;

    @Column(DataType.TEXT)
    declare observations: string;

    @BelongsTo(() => Student)
    student: Student;

    @BelongsTo(() => Administrator)
    administrator: Administrator;
}
export default Withdrawal;
