import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { FilterLogsDto } from './notification.dto';
import { Notification } from './notification.entity';
import { NotificationInterface } from './NotificationInterface';

@Injectable()
export class NotificationRepository {
  private readonly notificationModel;

  constructor(private readonly sequelize: Sequelize) {
    this.notificationModel = this.sequelize.model(Notification);
  }

  async create(payload: NotificationInterface): Promise<Notification> {
    return this.notificationModel.create(payload);
  }

  async findAll(filter: FilterLogsDto): Promise<Notification[]> {
    const where: any = {};
    if (filter.type) where.type = filter.type;
    if (filter.user) where.user = { [Op.iLike]: `%${filter.user}%` };
    if (filter.dateFrom || filter.dateTo) {
      where.sentAt = {};
      if (filter.dateFrom) where.sentAt[Op.gte] = new Date(filter.dateFrom);
      if (filter.dateTo) where.sentAt[Op.lte] = new Date(filter.dateTo);
    }
    return this.notificationModel.findAll({
      where,
      order: [['sentAt', 'DESC']],
    });
  }

  async findById(id: number) {
    const data = await this.notificationModel.findByPk(id);
    return data;
  }
  async updateById(id: number, payload: NotificationInterface) {
    console.log('id is', id, 'payload is', payload);
    const [affectedCount] = await this.notificationModel.update(payload, {
      where: { id },
    });

    if (affectedCount === 0) {
      throw new Error('Notification not found or no changes');
    }

    return await this.notificationModel.findByPk(id);
  }
}
