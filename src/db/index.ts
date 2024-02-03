import Database from 'tauri-plugin-sql-api';

export const getDb = async () => {
  const db = await Database.load('sqlite:test.db');

  return db;
};
