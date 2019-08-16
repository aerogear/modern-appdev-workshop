import { DataSyncConfig, OfflineClient } from '@aerogear/voyager-client';
import { Auth } from '@aerogear/auth';
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

export const createClient = (auth: Auth) => {
    let authLink;
    let terminatingLink; 
    const httpLink = createHttpLink({
        uri: 'http://localhost:4000/graphql',
    })

    if (auth) {
        authLink = setContext(async (operation, prevContext) => {
            const authContextProvider = auth.getAuthContextProvider()
            const authContext = await authContextProvider()
            return authContext
        });
    }

    if (authLink) {
        terminatingLink = authLink.concat(httpLink)
    } else {
        terminatingLink = httpLink
    }

    console.log('terminating link', terminatingLink)

    const config : DataSyncConfig = {
        httpUrl: "http://localhost:4000/graphql",
        //wsUrl: "ws://localhost:4000/graphql",
        terminatingLink,
      openShiftConfig: require("../mobile-services.json"),
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
