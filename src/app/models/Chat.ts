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
} from 'sequelize-typescript';
import User from './User';
import Message from './Message';

@Table({ tableName: 'chat' })
class Chat extends Model<Chat> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare participant1Id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare participant2Id: string;

    @BelongsTo(() => User, { foreignKey: 'participant1Id', as: 'participant1' })
    participant1: User;

    @BelongsTo(() => User, { foreignKey: 'participant2Id', as: 'participant2' })
    participant2: User;

    @HasMany(() => Message)
    messages: Message[];
}
export default Chat;
