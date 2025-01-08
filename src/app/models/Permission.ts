import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import PermissionRole from './PermissionRole';

@Table({ tableName: 'permissions' })
class Permission extends Model<Permission> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(100))
    declare name: string;

    @HasMany(() => PermissionRole)
    permissionRoles: PermissionRole[];
}
export default Permission;
