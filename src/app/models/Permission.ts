import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import PermissionRole, { PermissionRoleAttributes } from './PermissionRole';

interface PermissionAttributes {
    id: string;
    name: string;
    permissionRoles?: PermissionRoleAttributes[];
}

interface PermissionCreationAttributes extends Omit<PermissionAttributes, 'id' | 'permissionRoles'> {}

export { PermissionAttributes, PermissionCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'permissions',
})
class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(100))
    declare name: string;

    @HasMany(() => PermissionRole, { onDelete: 'SET NULL' })
    permissionRoles: PermissionRole[];
}
export default Permission;
