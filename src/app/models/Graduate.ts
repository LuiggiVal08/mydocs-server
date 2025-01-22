import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student, { StudentAttributes } from './Student';
import Pnf, { PnfAttributes } from './Pnf';

interface GraduateAttributes {
    id: string;
    studentId: string;
    pnfId: string;
    graduationDate: Date;
    titleType: string;
    student: StudentAttributes;
    pnf: PnfAttributes;
}

interface GraduateCreationAttributes extends Omit<GraduateAttributes, 'id' | 'student' | 'pnf'> {}

export { GraduateAttributes, GraduateCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'graduate',
})
class Graduate extends Model<GraduateAttributes, GraduateCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Student)
    @Column(DataType.UUID)
    declare studentId: string;

    @ForeignKey(() => Pnf)
    @Column(DataType.UUID)
    declare pnfId: string;

    @Column(DataType.DATE)
    declare graduationDate: Date;

    @Column(DataType.STRING(50))
    declare titleType: string;

    @BelongsTo(() => Student)
    student: Student;

    @BelongsTo(() => Pnf)
    pnf: Pnf;
}
export default Graduate;
