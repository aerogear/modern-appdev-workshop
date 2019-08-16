import { DataSyncConfig, OfflineClient } from '@aerogear/voyager-client';
import { Auth } from '@aerogear/auth';
import { AeroGearApp } from '@aerogear/app';

export const createClient = (auth: Auth, app: AeroGearApp) => {

    const config: DataSyncConfig = {
        httpUrl: "http://localhost:4000/graphql",
        wsUrl: "ws://localhost:4000/graphql",
        authContextProvider: auth.getAuthContextProvider(),
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

    const client = new OfflineClient(config);
    return client.init();
}
