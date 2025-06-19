import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const sqliteDb = new Database('db-data/database.sqlite3');

sqliteDb.pragma('journal_mode = WAL');
sqliteDb.pragma('journal_size_limit = 10000000');
sqliteDb.pragma('synchronous = NORMAL');
sqliteDb.pragma('foreign_keys = ON');
sqliteDb.pragma('mmap_size = 268435456');
sqliteDb.pragma('cache_size = -1048576');
sqliteDb.pragma('busy_timeout = 5000');
sqliteDb.pragma('temp_store = MEMORY');

sqliteDb.pragma('optimize');

export const db = drizzle(sqliteDb, { schema });
