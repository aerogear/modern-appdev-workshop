import fs from "fs";
import path from "path";
import * as config from '../../config.json'

/**
 * config class
 */
class Config {
  public port: any
<<<<<<< Updated upstream
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
=======
  public db: any
  public keycloakConfigPath: any;
  public keycloakConfig: any;
  public playgroundConfig: any;

  constructor() {
    this.port = process.env.PORT || 4000

    this.db = {
      database: process.env.DB_NAME || config.dbConfig.database,
      user: process.env.DB_USERNAME || config.dbConfig.user,
      password: process.env.DB_PASSWORD || config.dbConfig.password,
      host: process.env.DB_HOSTNAME || config.dbConfig.host,
      port: process.env.DB_PORT || config.dbConfig.port
    }

    this.keycloakConfigPath = process.env.KEYCLOAK_CONFIG || path.resolve(__dirname, './keycloak.json')
    this.keycloakConfig = readConfig(this.keycloakConfigPath)


    this.playgroundConfig = {
      tabs: [
        {
          endpoint: `/graphql`,
          variables: {},
          query: fs.readFileSync(path.resolve(__dirname, './playground.gql'), 'utf8')
        }
      ]
>>>>>>> Stashed changes
    }
  }
}

function readConfig(path: any) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch (e) {
    console.error(`Warning: couldn't find config at ${path}`)
  }
}


export default new Config()
