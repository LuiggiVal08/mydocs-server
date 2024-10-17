import { DataTypes, Model, Optional } from 'sequelize';
import dbConn from '@/config/dbConn';
import Cabinet from './cabinet';
import Admin from './admin';
import { UUID } from 'crypto';

interface CabinetHistoryAttr {
    id: number;
    cabinet_id: UUID;
    action: string;
    admin_id: UUID;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CabinetHistoryInput
    extends Optional<CabinetHistoryAttr, 'id'> {}
export interface CabinetHistoryOutput extends Required<CabinetHistoryAttr> {}

class CabinetHistory extends Model<CabinetHistoryAttr, CabinetHistoryInput> {}

CabinetHistory.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        cabinet_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Cabinet,
                key: 'id',
            },
        },
        action: {
            type: DataTypes.STRING,
        },
        admin_id: {
            type: DataTypes.UUIDV4,
            references: {
                model: Admin,
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
        modelName: 'CabinetHistory',
        tableName: 'cabinet_history',
    },
);

// Relaciones
Cabinet.hasMany(CabinetHistory, { foreignKey: 'cabinet_id' });
CabinetHistory.belongsTo(Cabinet, { foreignKey: 'cabinet_id' });

Admin.hasMany(CabinetHistory, { foreignKey: 'admin_id' });
CabinetHistory.belongsTo(Admin, { foreignKey: 'admin_id' });

// CabinetHistory.sync({ force: true });
// CabinetHistory.sync()
export default CabinetHistory;
