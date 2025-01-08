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
import Role from './Role';
import Withdrawal from './Withdrawal';
import Enrollment from './Enrollment';

@Table({ tableName: 'administrator' })
class Administrator extends Model<Administrator> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @ForeignKey(() => Role)
    @Column(DataType.UUID)
    declare roleId: string;

    @Column(DataType.STRING(50))
    declare status: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Role)
    role: Role;

    @HasMany(() => Withdrawal)
    withdrawals: Withdrawal[];

    @HasMany(() => Enrollment)
    enrollments: Enrollment[];
}
export default Administrator;
