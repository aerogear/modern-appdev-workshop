import { OfflineClient } from '@aerogear/voyager-client';
import { useApolloClient } from '@apollo/react-hooks'

export const useSyncClient = () => {
    // Apollo client will be replaced with the offline client with additional methods
    return useApolloClient() as unknown as OfflineClient;
};
