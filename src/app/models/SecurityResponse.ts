import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';
import SecurityQuestion from './SecurityQuestion';

@Table({ tableName: 'security_response' })
class SecurityResponse extends Model<SecurityResponse> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @ForeignKey(() => SecurityQuestion)
    @Column(DataType.UUID)
    declare questionId: string;

    @Column(DataType.STRING(255))
    declare response: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => SecurityQuestion)
    question: SecurityQuestion;
}
export default SecurityResponse;
    