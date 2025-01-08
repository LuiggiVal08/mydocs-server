import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Chat from './Chat';
import User from './User';

@Table({ tableName: 'message' })
class Message extends Model<Message> {
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
