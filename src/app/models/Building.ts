import { Column, Model, PrimaryKey, Table, DataType, Default, HasMany } from 'sequelize-typescript';
import Classroom from './Classroom';

@Table({ tableName: 'building' })
class Building extends Model<Building> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare location: string;

    @HasMany(() => Classroom)
    classrooms: Classroom[];
}

export default Building;
