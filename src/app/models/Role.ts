import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';

import PermissionRole, { PermissionRoleAttributes } from './PermissionRole';
import Administrator, { AdministratorAttributes } from './Administrator';
//
interface RoleAttributes {
    id: string;
    name: string;
    administrators: AdministratorAttributes[];
    permissionRoles: PermissionRoleAttributes[];
}

interface RoleCreationAttributes extends Omit<RoleAttributes, 'id' | 'administrators' | 'permissionRoles'> {}

export { RoleAttributes, RoleCreationAttributes };

@Table({
    timestamps: true,
    tableName: 'role',
})
class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Administrator, { onDelete: 'RESTRICT' })
    administrators: Administrator[];

    @HasMany(() => PermissionRole, { onDelete: 'SET NULL' })
    permissionRoles: PermissionRole[];
}
export default Role;
