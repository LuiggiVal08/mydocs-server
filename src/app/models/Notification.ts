import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User, { UserAttributes } from './User';

interface NotificationAttributes {
    id: string;
    userId: string;
    qualification: string;
    text: string;
    url: string;
    read: boolean;
    date: Date;
    user: UserAttributes;
}

interface NotificationCreationAttributes extends Omit<NotificationAttributes, 'id' | 'read' | 'user'> {}

export { NotificationAttributes, NotificationCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'notification',
})
class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @Column(DataType.STRING(100))
    declare qualification: string;

    @Column(DataType.TEXT)
    declare text: string;

    @Column(DataType.STRING)
    declare url: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare read: boolean;

    @Column(DataType.DATE)
    declare date: Date;

    @BelongsTo(() => User)
    user: User;
}
export default Notification;
