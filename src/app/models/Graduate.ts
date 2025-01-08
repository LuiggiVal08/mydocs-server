import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student from './Student';
import Pnf from './Pnf';

@Table({ tableName: 'graduate' })
class Graduate extends Model<Graduate> {
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
