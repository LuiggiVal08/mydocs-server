import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student, { StudentAttributes } from './Student';
import Administrator, { AdministratorAttributes } from './Administrator';

// Interface for Withdrawal attributes
interface WithdrawalAttributes {
    id: string;
    studentId: string;
    administratorId: string;
    withdrawalDate: Date;
    reason: string;
    observations: string;
    student: StudentAttributes;
    administrator: AdministratorAttributes;
}

// Interface for Withdrawal creation attributes
interface WithdrawalCreationAttributes extends Omit<WithdrawalAttributes, 'id' | 'student' | 'administrator'> {}

// Export the interfaces
export { WithdrawalAttributes, WithdrawalCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'withdrawal',
})
class Withdrawal extends Model<WithdrawalAttributes, WithdrawalCreationAttributes> {
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
