import knex from 'knex'
import * as config from '../config.json'

export async function connect(options: knex.MySqlConnectionConfig) {
  const db = knex({
    client: config.database,
    connection: options
  })
  // Not required for localhost
  // It will be used to simplify deployment
  // to openshift
  // await createDatabaseInOpenShift(db);
  return db
}

async function createDatabaseInOpenShift(db: any) {
  const tasksExists = await db.schema.hasTable('tasks')
  if (!tasksExists) {
    await db.schema.createTable('tasks', (table: any) => {
      table.string('title')
      table.string('description')
      // Required for conflict resolution
      table.integer('version')
      table.increments('id')
      table.string('status')
      table.string('assignee')
    })
  }
}
