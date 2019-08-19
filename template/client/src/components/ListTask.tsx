import { CacheOperation, createSubscriptionOptions } from '@aerogear/voyager-client';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { List } from 'semantic-ui-react'
import { TaskQuery } from '../graphql/queries/Tasks';
import { TaskCreateSubscription } from '../graphql/subscriptions/NewTask';

export const Tasks: React.FC = () => {
    const { loading, error, data, subscribeToMore } = useQuery(TaskQuery, {
        fetchPolicy: "cache-and-network"
    })

    initSubscription(subscribeToMore);

    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error :(</p>; }
    if (!data || !data.findAllTasks) { return <p>No Data :(</p>; }

    console.log("Data from server", data.findAllTasks);

    const renderTaskItems = (data) => {
        return data.findAllTasks.map((item) => (
            <List.Item>
                <List.Content>
                    <List.Header >{item.title}</List.Header>
                    <List.Description> {item.description}</List.Description>
                </List.Content>
            </List.Item >
        ))
    }

    return (
        <List>
            {renderTaskItems(data)}
        </List>
    );
}


function initSubscription(subscribeToMore) {
    const options = {
        subscriptionQuery: TaskCreateSubscription,
        cacheUpdateQuery: TaskQuery,
        operationType: CacheOperation.ADD
    };
    const subOptions = createSubscriptionOptions(options);
    subscribeToMore(subOptions);
}

