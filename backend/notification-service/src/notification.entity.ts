// src/notification/notification.model.ts
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'notifications',
  timestamps: false,
})
export class Notification extends Model<Notification> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user: string;

  @Column(DataType.TEXT)
  message: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DATE,
    field: 'sent_at',
    defaultValue: DataType.NOW,
  })
  sentAt: Date;
}
