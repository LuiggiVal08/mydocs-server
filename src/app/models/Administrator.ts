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
import Role, { RoleAttributes } from './Role';
import Withdrawal, { WithdrawalAttributes } from './Withdrawal';
import Enrollment, { EnrollmentAttributes } from './Enrollment';
//

interface AdministratorAttributes {
    id: string;
    userId: string;
    roleId: string;
    status?: 'Activo' | 'Inactivo';
    role?: RoleAttributes;
    withdrawals?: WithdrawalAttributes[];
    enrollments?: EnrollmentAttributes[];
}

interface AdministratorCreationAttributes extends Omit<AdministratorAttributes, 'id' | 'withdrawals' | 'enrollments'> {}
export { AdministratorAttributes, AdministratorCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'administrator',
})
class Administrator extends Model<AdministratorAttributes, AdministratorCreationAttributes> {
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

    @Default('Inactivo')
    @Column(DataType.STRING(50))
    declare status: string;

    @BelongsTo(() => User, { onDelete: 'CASCADE' })
    user: User;

    @BelongsTo(() => Role, { onDelete: 'SET NULL' })
    role: Role;

    @HasMany(() => Withdrawal, { onDelete: 'SET NULL' })
    withdrawals: Withdrawal[];

    @HasMany(() => Enrollment, { onDelete: 'SET NULL' })
    enrollments: Enrollment[];
}

export default Administrator;
