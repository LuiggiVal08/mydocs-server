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
} from 'sequelize-typescript';
import User from './User';
import Enrollment from './Enrollment';
import Withdrawal from './Withdrawal';
import Graduate from './Graduate';

@Table({ tableName: 'student' })
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

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Enrollment)
    enrollments: Enrollment[];

    @HasMany(() => Withdrawal)
    withdrawals: Withdrawal[];

    @HasMany(() => Graduate)
    graduates: Graduate[];
}
export default Student;
