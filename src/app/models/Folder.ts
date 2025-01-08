import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student from './Student';
import Level from './Level';

@Table({ tableName: 'folder' })
class Folder extends Model<Folder> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Student)
    @Column(DataType.UUID)
    declare studentId: string;

    @ForeignKey(() => Level)
    @Column(DataType.UUID)
    declare levelId: string;

    @Column(DataType.TEXT)
    declare location: string;

    @BelongsTo(() => Student)
    student: Student;

    @BelongsTo(() => Level)
    level: Level;
}
export default Folder;
