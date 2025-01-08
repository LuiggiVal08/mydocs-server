import { Column, Model, PrimaryKey, Table, DataType, Default } from 'sequelize-typescript';

@Table({ tableName: 'security_question' })
class SecurityQuestion extends Model<SecurityQuestion> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(255))
    declare question: string;
}
export default SecurityQuestion;
