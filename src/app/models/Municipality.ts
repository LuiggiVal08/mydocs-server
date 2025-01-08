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
import { Optional } from 'sequelize';
import State from './State';
import User from './User';

interface MunicipalityAttributes {
    id: string;
    stateId: string;
    name: string;
}
interface MunicipalityCreationAttributes extends Optional<MunicipalityAttributes, 'id'> {}

@Table({ tableName: 'municipality' })
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

    @HasMany(() => User)
    users: User[];
}

export default Municipality;
