import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Student, { StudentAttributes } from './Student';
import Level, { LevelAttributes } from './Level';

interface FolderAttributes {
    id: string;
    studentId: string;
    levelId: string;
    location: string;
    student: StudentAttributes;
    level: LevelAttributes;
}

interface FolderCreationAttributes extends Omit<FolderAttributes, 'id' | 'student' | 'level'> {}

export { FolderAttributes, FolderCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'folder',
})
class Folder extends Model<FolderAttributes, FolderCreationAttributes> {
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
