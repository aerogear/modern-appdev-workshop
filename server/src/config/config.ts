import knex from 'knex'
import * as config from '../../config.json'

/**
 * config class
 */
class Config {
  public port: any
  public database: string
  public db: knex.MySqlConnectionConfig | knex.Sqlite3ConnectionConfig
  constructor() {
    this.port = process.env.PORT || 4000
    this.database = "pg"
    this.db = {
      host: process.env.DB_HOST || config.dbConfig.host,
      port: config.dbConfig.port,
      user: process.env.DB_USER || config.dbConfig.user,
      password: process.env.DB_PASSWORD || config.dbConfig.password,
      database: process.env.DB_DATABASE || config.dbConfig.database,
    }
  }
}

export default new Config()
