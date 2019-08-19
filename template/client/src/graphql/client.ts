import { DataSyncConfig, OfflineClient } from '@aerogear/voyager-client';
import { Auth } from '@aerogear/auth';
import { AeroGearApp } from '@aerogear/app';

export const createClient = (auth: Auth | undefined, app: AeroGearApp) => {

    const syncConfigs = app.config && app.config.getConfigByType('sync-app')

    const syncConfig = (syncConfigs && syncConfigs.length > 0) ? syncConfigs[0] : undefined

    const httpUrl = syncConfig && syncConfig.url ? syncConfig.url : "http://localhost:4000/graphql"
    const wsUrl = syncConfig && syncConfig.config.websocketUrl ? syncConfig.config.websocketUrl : "ws://localhost:4000/graphql"

    const config: DataSyncConfig = {
        httpUrl,
        wsUrl,
        openShiftConfig: app.config,
        offlineQueueListener: {
            onOperationEnqueued: () => {
                console.log("Operation added to offline queue")
            },
            onOperationSuccess: () => {
                console.log("Operation replicated")
            },
            onOperationFailure: () => {
                console.log("Operation failed to replicate")
            }
        },
        conflictListener: {
            conflictOccurred: () => {
                console.log("Conflict resolved")
            }
        }
    }
    if (auth) {
        config.authContextProvider = auth.getAuthContextProvider();
    }

    const client = new OfflineClient(config);
    return client.init();
}
