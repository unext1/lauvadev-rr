import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .default(sql`(lower(hex(randomblob(16))))`)
    .notNull(),
  email: text('email').unique().notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

export type InsertUserTableType = typeof userTable.$inferInsert;
export type UserTableType = typeof userTable.$inferSelect;
