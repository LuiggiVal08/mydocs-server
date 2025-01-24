import {
    Column,
    Model,
    PrimaryKey,
    Table,
    DataType,
    Default,
    HasMany,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import Classroom, { ClassroomAttributes } from './Classroom';
import Core, { CoreAttributes } from './Core';

interface BuildingAttributes {
    id: string;
    name: string;
    location: string;
    coreId: string;
    classrooms?: ClassroomAttributes[];
    core?: CoreAttributes;
}

interface BuildingCreationAttributes extends Omit<BuildingAttributes, 'id' | 'classrooms' | 'core'> {}

export { BuildingAttributes, BuildingCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'building',
})
class Building extends Model<BuildingAttributes, BuildingCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare location: string;

    @ForeignKey(() => Core)
    @Column(DataType.UUID)
    coreId: string;

    @HasMany(() => Classroom, { onDelete: 'CASCADE' })
    classrooms: Classroom[];

    @BelongsTo(() => Core, { onDelete: 'CASCADE' })
    core: Core;
}

export default Building;
