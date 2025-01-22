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
import User, { UserAttributes } from './User';
import Message, { MessageAttributes } from './Message';

interface ChatAttributes {
    id: string;
    participant1Id: string;
    participant2Id: string;
    participant1: UserAttributes;
    participant2: UserAttributes;
    messages: MessageAttributes[];
}

interface ChatCreationAttributes extends Omit<ChatAttributes, 'id' | 'participant1' | 'participant2' | 'messages'> {}

export { ChatAttributes, ChatCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'chat',
})
class Chat extends Model<ChatAttributes, ChatCreationAttributes> {
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

    @BelongsTo(() => User, { onDelete: 'SET NULL', foreignKey: 'participant1Id', as: 'participant1' })
    participant1: User;

    @BelongsTo(() => User, { onDelete: 'SET NULL', foreignKey: 'participant2Id', as: 'participant2' })
    participant2: User;

    @HasMany(() => Message, { onDelete: 'CASCADE' })
    messages: Message[];
}
export default Chat;
