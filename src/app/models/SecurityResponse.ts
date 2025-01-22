import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User, { UserAttributes } from './User';
import SecurityQuestion, { SecurityQuestionAttributes } from './SecurityQuestion';

interface SecurityResponseAttributes {
    id: string;
    userId: string;
    questionId: string;
    response: string;
    user: UserAttributes;
    question: SecurityQuestionAttributes;
}

interface SecurityResponseCreationAttributes extends Omit<SecurityResponseAttributes, 'id' | 'user' | 'question'> {}

export { SecurityResponseAttributes, SecurityResponseCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'security_response',
})
class SecurityResponse extends Model<SecurityResponseAttributes, SecurityResponseCreationAttributes> {
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
