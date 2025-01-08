import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'token' })
class Token extends Model<Token> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @Column(DataType.STRING(255))
    declare token: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare used: boolean;

    @Column(DataType.DATE)
    declare expiration: Date;

    @BelongsTo(() => User)
    user: User;
}
export default Token;
