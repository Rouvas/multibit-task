import Dexie, { Table } from 'dexie';
import {Task} from '../interfaces/task';

export class AppDB extends Dexie {
  tasks!: Table<Task, number>;

  constructor() {
    super('multibittasks');
    this.version(1).stores({
      tasks: '++id, title, status',
    });
    this.on('populate', () => this.populate())
  }

  async populate() {
    await db.tasks.bulkAdd([
      {
        title: 'Написать введение',
        description: 'Введение к дипломной работе',
        status: false,
      },
      {
        title: 'Проверить литературу',
        description: 'Убедиться в актуальности источников',
        status: false,
      },
      {
        title: 'Сдать в дипломную работу в ГЭК',
        description: null,
        status: false,
      },
    ])
  }

}

export const db = new AppDB();
