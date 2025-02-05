import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User, { UserAttributes } from './User';

interface SessionAttributes {
    id: string;
    userId: string;
    device: string;
    ip: string;
    start: Date;
    end: Date;
    status: boolean;
    user: UserAttributes;
}

interface SessionCreationAttributes extends Omit<SessionAttributes, 'id' | 'end' | 'status' | 'user'> {}

export { SessionAttributes, SessionCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'session',
})
class Session extends Model<SessionAttributes, SessionCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @Column(DataType.STRING(100))
    declare device: string;

    @Column(DataType.STRING(45))
    declare ip: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    declare start: Date;

    @Column(DataType.DATE)
    declare end: Date;

    @Default(true)
    @Column(DataType.BOOLEAN)
    declare status: boolean;

    @BelongsTo(() => User)
    user: User;
}
export default Session;
