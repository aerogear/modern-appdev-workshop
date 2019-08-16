import {
    OfflineClient
} from 'offix-client';
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

    const config = {
        httpUrl: "http://localhost:4000/graphql",
        //wsUrl: "ws://localhost:4000/graphql",
        terminatingLink
    }

    const client = new OfflineClient(config);
    return client.init();
}
