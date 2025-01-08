import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'notification' })
class Notification extends Model<Notification> {
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
