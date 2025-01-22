import { Column, Model, PrimaryKey, Table, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User, { UserAttributes } from './User';

interface TokenAttributes {
    id: string;
    userId: string;
    token: string;
    used: boolean;
    expiration: Date;
    user: UserAttributes;
}

interface TokenCreationAttributes extends Omit<TokenAttributes, 'id' | 'used' | 'user'> {}

export { TokenAttributes, TokenCreationAttributes };
@Table({
    timestamps: true,
    tableName: 'token',
})
class Token extends Model<TokenAttributes, TokenCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    declare userId: string;

    @Column(DataType.STRING(255))
    declare token: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare used: boolean;

    @Column(DataType.DATE)
    declare expiration: Date;

    @BelongsTo(() => User)
    user: User;
}
export default Token;
