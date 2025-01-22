import { Column, Model, PrimaryKey, Table, DataType, Default } from 'sequelize-typescript';

// Interface for the attributes of the Extension model
export interface ExtensionAttributes {
    id: string;
    name: string;
}

// Interface for the creation attributes of the Extension model
export interface ExtensionCreationAttributes extends Omit<ExtensionAttributes, 'id'> {}
@Table({
    timestamps: true,
    tableName: 'extension',
})
class Extension extends Model<ExtensionAttributes, ExtensionCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.STRING(10))
    declare name: string;
}
export default Extension;
