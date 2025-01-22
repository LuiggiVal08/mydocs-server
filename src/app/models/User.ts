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
    BeforeCreate,
} from 'sequelize-typescript';
import Municipality, { MunicipalityAttributes } from './Municipality';
import Token, { TokenAttributes } from './Token';
import Chat, { ChatAttributes } from './Chat';
import Notification, { NotificationAttributes } from './Notification';
import Session, { SessionAttributes } from './Session';
import { hashPassword } from '@/helpers/crypto';

interface UserAttributes {
    id: string;
    municipalityId: string;
    dni: string;
    name: NonNullable<string>;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    gender: 'Masculino' | 'Femenino';
    dateOfBirth: Date;
    avatar: string;
    municipality: MunicipalityAttributes;
    tokens: TokenAttributes[];
    chats: ChatAttributes[];
    notifications: NotificationAttributes[];
    sessions: SessionAttributes[];
}

interface UserCreationAttributes
    extends Omit<
        UserAttributes,
        'id' | 'avatar' | 'tokens' | 'chats' | 'notifications' | 'sessions' | 'municipality'
    > {}

export { UserAttributes, UserCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'user',
})
class User extends Model<UserAttributes, UserCreationAttributes> {
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

    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @AllowNull(false)
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

    @AllowNull(false)
    @Column(DataType.STRING)
    declare phone: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare password: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare address: string;

    @AllowNull(false)
    @Column(DataType.STRING(10))
    declare gender: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare dateOfBirth: Date;

    @AllowNull(false)
    @Default('profile-default.png')
    @Column(DataType.STRING)
    declare avatar: string;

    @BelongsTo(() => Municipality, { onDelete: 'SET NULL' })
    municipality: Municipality;

    @HasMany(() => Token, { onDelete: 'CASCADE' })
    tokens: Token[];

    @HasMany(() => Chat, { onDelete: 'CASCADE' })
    chats: Chat[];

    @HasMany(() => Notification, { onDelete: 'CASCADE' })
    notifications: Notification[];

    @HasMany(() => Session, { onDelete: 'CASCADE' })
    sessions: Session[];

    @BeforeCreate
    static async hashPassword(user: User) {
        user.password = await hashPassword(user.password);
    }
}

export default User;
