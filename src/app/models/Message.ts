import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Chat, { ChatAttributes } from './Chat';
import User, { UserAttributes } from './User';

// Interface for Message attributes
interface MessageAttributes {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    sentIn: Date;
    read: boolean;
    chat: ChatAttributes;
    sender: UserAttributes;
}

// Interface for Message creation attributes
interface MessageCreationAttributes extends Omit<MessageAttributes, 'id' | 'sentIn' | 'read' | 'chat' | 'sender'> {}

// Export the interfaces
export { MessageAttributes, MessageCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'message',
})
class Message extends Model<MessageAttributes, MessageCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Chat)
    @Column(DataType.UUID)
    declare chatId: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare senderId: string;

    @Column(DataType.TEXT)
    declare text: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    declare sentIn: Date;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare read: boolean;

    @BelongsTo(() => Chat)
    chat: Chat;

    @BelongsTo(() => User)
    sender: User;
}
export default Message;
