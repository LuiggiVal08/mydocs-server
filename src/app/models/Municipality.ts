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
    AllowNull,
    IsUUID,
} from 'sequelize-typescript';

import State, { StateAttributes } from './State';
import User, { UserAttributes } from './User';

interface MunicipalityAttributes {
    id: string;
    stateId: string;
    name: string;
    state: StateAttributes;
    users: UserAttributes[];
}
interface MunicipalityCreationAttributes extends Omit<MunicipalityAttributes, 'id' | 'state' | 'users'> {}
export { MunicipalityAttributes, MunicipalityCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'municipality',
})
class Municipality extends Model<MunicipalityAttributes, MunicipalityCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @IsUUID(4)
    @ForeignKey(() => State)
    @Column(DataType.UUID)
    stateId: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @BelongsTo(() => State)
    state: State;

    @HasMany(() => User, { onDelete: 'SET NULL' })
    users: User[];
}

export default Municipality;
