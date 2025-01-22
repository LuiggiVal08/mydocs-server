import { Column, Model, PrimaryKey, Table, DataType, Default } from 'sequelize-typescript';

// Interface for the attributes of the SecurityQuestion model
interface SecurityQuestionAttributes {
    id: string;
    question: string;
}

// Interface for the creation attributes of the SecurityQuestion model
interface SecurityQuestionCreationAttributes extends Omit<SecurityQuestionAttributes, 'id'> {}
export {SecurityQuestionAttributes, SecurityQuestionCreationAttributes};
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
}
export default SecurityQuestion;
