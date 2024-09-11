// models/gender.ts
import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';

interface GenderAttr {
    id: number;
    gender: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface GenderInput extends Optional<GenderAttr, 'id'> {}
export interface GenderOutput extends Required<GenderAttr> {}

class Gender extends Model<GenderAttr, GenderInput> {}

Gender.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    {
        sequelize: dbConn,
        modelName: 'Gender',
        tableName: 'Genders',
    },
);
// Gender.sync({force:true})
// Gender.sync()
export default Gender;
