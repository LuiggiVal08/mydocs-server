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
    HasOne,
    BeforeUpdate,
} from 'sequelize-typescript';
import Municipality, { MunicipalityAttributes } from './Municipality';
import Token, { TokenAttributes } from './Token';
import Chat, { ChatAttributes } from './Chat';
import Notification, { NotificationAttributes } from './Notification';
import Session, { SessionAttributes } from './Session';
import { hashPassword } from '@/helpers/crypto';
import Student from './Student';
import Administrator from './Administrator';

interface UserAttributes {
    id: string;
    municipalityId: string;
    dni: string;
    name: NonNullable<string>;
    lastName: string;
    username: string | null;
    email: string;
    phone: string;
    password: string | null;
    address: string;
    gender: 'Masculino' | 'Femenino';
    dateOfBirth: Date;
    avatar: string;
    municipality: MunicipalityAttributes;
    student?: Student;
    administrator?: Administrator;
    tokens?: TokenAttributes[];
    chats?: ChatAttributes[];
    notifications?: NotificationAttributes[];
    sessions?: SessionAttributes[];
}

interface UserCreationAttributes
    extends Omit<
        UserAttributes,
        | 'id'
        | 'avatar'
        | 'tokens'
        | 'chats'
        | 'notifications'
        | 'sessions'
        | 'municipality'
        | 'student'
        | 'administrator'
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

    @AllowNull(true)
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

    @AllowNull(true)
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

    @AllowNull(true)
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

    @HasOne(() => Student, { onDelete: 'CASCADE' })
    student: Student;

    @HasOne(() => Administrator, { onDelete: 'CASCADE' })
    administrator: Administrator;

    @HasMany(() => Token, { onDelete: 'CASCADE' })
    tokens: Token[];

    @HasMany(() => Chat, { onDelete: 'CASCADE' })
    chats: Chat[];

    @HasMany(() => Notification, { onDelete: 'CASCADE' })
    notifications: Notification[];

    @HasMany(() => Session, { onDelete: 'CASCADE' })
    sessions: Session[];

    @BeforeUpdate
    @BeforeCreate
    static async hashPassword(user: User) {
        if (user.password && user.changed('password')) {
            user.password = await hashPassword(user.password);
        }
    }
}

export default User;
