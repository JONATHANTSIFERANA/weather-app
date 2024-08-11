import { DataSource } from 'typeorm/browser';
import { Region } from './table/region';
import * as SQLite from 'expo-sqlite';

const AppDataSource = new DataSource({
  type: 'expo',
  database: 'mydb.db',
  driver: SQLite,
  entities: [Region],
  synchronize: true,
  logging: true,
});

export const initializeDatabase = async () => {
  return AppDataSource.initialize();
};

export { AppDataSource };
