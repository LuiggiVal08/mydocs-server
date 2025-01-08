import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'session' })
class Session extends Model<Session> {
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

    @Column(DataType.DATE)
    declare start: Date;

    @Column(DataType.DATE)
    declare end: Date;

    @Default(true)
    @Column(DataType.BOOLEAN)
    declare state: boolean;

    @BelongsTo(() => User)
    user: User;
}
export default Session;
