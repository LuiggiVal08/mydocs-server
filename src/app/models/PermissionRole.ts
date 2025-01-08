import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Role from './Role';
import Permission from './Permission';

@Table({ tableName: 'permission_role' })
class PermissionRole extends Model<PermissionRole> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Role)
    @Column(DataType.UUID)
    declare roleId: string;

    @ForeignKey(() => Permission)
    @Column(DataType.UUID)
    declare permissionId: string;

    @BelongsTo(() => Role)
    role: Role;

    @BelongsTo(() => Permission)
    permission: Permission;
}
export default PermissionRole;
