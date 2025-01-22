import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Role, { RoleAttributes } from './Role';
import Permission, { PermissionAttributes } from './Permission';

interface PermissionRoleAttributes {
    id: string;
    roleId: string;
    permissionId: string;
    role: RoleAttributes;
    permission: PermissionAttributes;
}

interface PermissionRoleCreationAttributes extends Omit<PermissionRoleAttributes, 'id' | 'role' | 'permission'> {}

export { PermissionRoleAttributes, PermissionRoleCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'permission_role',
})
class PermissionRole extends Model<PermissionRoleAttributes, PermissionRoleCreationAttributes> {
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
