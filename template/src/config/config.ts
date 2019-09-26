import fs from "fs";
import path from "path";
import * as config from '../../graphback.json'

/**
 * config class
 */
class Config {
  public port: any
  public db: any
  public keycloakConfigPath: any;
  public keycloakConfig: any;
  public playgroundConfig: any;

  constructor() {
    this.port = process.env.PORT || 4000

    this.db = {
      host: process.env.DB_HOST || config.db.dbConfig.host,
      user: process.env.DB_USER || config.db.dbConfig.user,
      password: process.env.DB_PASSWORD || config.db.dbConfig.password,
      database: process.env.DB_DATABASE || config.db.dbConfig.database,
      port: process.env.DB_PORT || config.db.dbConfig.port
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
