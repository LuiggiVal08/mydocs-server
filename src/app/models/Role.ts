import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';

import PermissionRole from './PermissionRole';
import Administrator from './Administrator';

@Table({ tableName: 'role' })
class Role extends Model<Role> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Administrator)
    administrators: Administrator[];

    @HasMany(() => PermissionRole)
    permissionRoles: PermissionRole[];
}
export default Role;
