import {
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    Default,
    ForeignKey,
    BelongsTo,
    HasMany,
    HasOne,
} from 'sequelize-typescript';
import User, { UserAttributes } from './User';
import Enrollment, { EnrollmentAttributes } from './Enrollment';
import Withdrawal, { WithdrawalAttributes } from './Withdrawal';
import Graduate, { GraduateAttributes } from './Graduate';
import Attendance from './Attendance';
import Folder from './Folder';

interface StudentAttributes {
    id: string;
    userId: string;
    active: boolean;
    user: UserAttributes;
    enrollments?: EnrollmentAttributes[];
    attendances?: Attendance[];
    withdrawals?: WithdrawalAttributes;
    graduates?: GraduateAttributes[];
}

interface StudentCreationAttributes
    extends Omit<
        StudentAttributes,
        'id' | 'active' | 'user' | 'enrollments' | 'withdrawals' | 'graduates' | 'attendances'
    > {}

export { StudentAttributes, StudentCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'student',
})
class Student extends Model<Student> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @Default(true)
    @Column(DataType.BOOLEAN)
    declare active: boolean;

    @HasOne(() => Folder, { onDelete: 'CASCADE' })
    folder: Folder;

    @HasOne(() => Withdrawal, { onDelete: 'CASCADE' })
    withdrawals: Withdrawal;

    @BelongsTo(() => User, { onDelete: 'SET NULL' })
    user: User;

    @HasMany(() => Enrollment, { onDelete: 'CASCADE' })
    enrollments: Enrollment[];

    @HasMany(() => Attendance, { onDelete: 'CASCADE' })
    attendances: Attendance[];

    @HasMany(() => Graduate, { onDelete: 'CASCADE' })
    graduates: Graduate[];
}
export default Student;
