import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import SecurityResponse from './SecurityResponse';

// Interface for the attributes of the SecurityQuestion model
interface SecurityQuestionAttributes {
    id: string;
    question: string;
    securityResponses?: SecurityResponse[];
}

// Interface for the creation attributes of the SecurityQuestion model
interface SecurityQuestionCreationAttributes extends Omit<SecurityQuestionAttributes, 'id' | 'securityResponses'> {}

export { SecurityQuestionAttributes, SecurityQuestionCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'security_question',
})
class SecurityQuestion extends Model<SecurityQuestionAttributes, SecurityQuestionCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(255))
    declare question: string;

    @HasMany(() => SecurityResponse, { onDelete: 'CASCADE' })
    securityResponses: SecurityResponse[];
}
export default SecurityQuestion;
