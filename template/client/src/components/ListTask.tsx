import { useQuery, useSubscription } from '@apollo/react-hooks';
import React from 'react';
import { List } from 'semantic-ui-react'
import { TaskQuery } from '../graphql/queries/Tasks';
import { TaskCreateSubscription } from '../graphql/subscriptions/NewTask';
import { createSubscriptionOptions, CacheOperation } from '@aerogear/voyager-client';

export const Tasks: React.FC = () => {
    useQuery(TaskQuery, {
        fetchPolicy: "network-only"
    })
    const { loading, error, data, subscribeToMore } = useQuery(TaskQuery, {
        fetchPolicy: "cache-first"
    })
    // const options = {
    //     subscriptionQuery: TaskCreateSubscription,
    //     cacheUpdateQuery: TaskQuery,
    //     operationType: CacheOperation.ADD
    // }
    // const subOptions = createSubscriptionOptions(options);
    // subscribeToMore(subOptions)

    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error :(</p>; }
    if (!data || !data.findAllTasks) { return <p>No Data :(</p>; }

    console.log("Data from server", data.findAllTasks);

    return data.findAllTasks.map(({ title, description }) => (
        <List>
            <List.Item >
                <List.Content>
                    <List.Header >{title}</List.Header>
                    <List.Description> {description}</List.Description>
                </List.Content>
            </List.Item>
        </List>
    ));
}
