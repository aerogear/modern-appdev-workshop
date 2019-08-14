import {
    OfflineClient
} from 'offix-client';


let config = {
    httpUrl: "http://localhost:4000/graphql",
    wsUrl: "ws://localhost:4000/graphql",
}

export let graphqlClient

export const createClient = () => {
    const client = new OfflineClient(config);
    return client.init().then(newClient => {
        return graphqlClient = newClient;
    });
}
