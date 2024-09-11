// models/city.ts
import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import State from './state';

interface MunicipalityAttr {
    id: number;
    name: string;
    state_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MunicipalityInput extends Optional<MunicipalityAttr, 'id'> { }
export interface CityOutput extends Required<MunicipalityAttr> { }

class Municipality extends Model<MunicipalityAttr, MunicipalityInput> { }

Municipality.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_id: {
            type: DataTypes.INTEGER,
            references: {
                model: State,
                key: 'id',
            },
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
        modelName: 'Municipality',
        tableName: 'Municipalities',
    },
);

// Define associations
Municipality.belongsTo(State, { foreignKey: 'state_id' });
State.hasMany(Municipality, { foreignKey: 'state_id' });

// Municipality.sync({force:true})
// Municipality.sync()

export default Municipality;
