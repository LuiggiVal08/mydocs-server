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
    IsEmail,
    Unique,
} from 'sequelize-typescript';
import Municipality from './Municipality';
import Token from './Token';
import Chat from './Chat';
import Notification from './Notification';
import Session from './Session';

@Table({ tableName: 'user' })
class User extends Model<User> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @ForeignKey(() => Municipality)
    @Column(DataType.UUID)
    declare municipalityId: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    declare dni: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare lastName: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    declare username: string;

    @AllowNull(false)
    @IsEmail
    @Unique
    @Column(DataType.STRING)
    declare email: string;

    @Column(DataType.STRING)
    declare phone: string;

    @Column(DataType.STRING)
    declare password: string;

    @Column(DataType.STRING)
    declare address: string;

    @Column(DataType.STRING(10))
    declare gender: string;

    @Column(DataType.DATE)
    declare dateOfBirth: Date;

    @Column(DataType.STRING)
    declare avatar: string;

    @BelongsTo(() => Municipality)
    municipality: Municipality;

    @HasMany(() => Token)
    tokens: Token[];

    @HasMany(() => Chat)
    chats: Chat[];

    @HasMany(() => Notification)
    notifications: Notification[];

    @HasMany(() => Session)
    sessions: Session[];
}
export default User;
