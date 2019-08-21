import { CacheOperation, createSubscriptionOptions } from '@aerogear/voyager-client';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { List } from 'semantic-ui-react'
import { TaskQuery } from '../graphql/queries/Tasks';
import { TaskCreateSubscription } from '../graphql/subscriptions/NewTask';
import { useSyncClient } from '../helpers/useDataSyncClient';
import { taskAssignment } from './AssignTask';
import { TaskItem } from './TaskItem';

export const Tasks: React.FC = () => {
    const [subscribed, setSubscribed] = React.useState(false);
    const { loading, error, data, subscribeToMore } = useQuery(TaskQuery, {
        fetchPolicy: "cache-and-network"
    })
    if (!subscribed) {
        initSubscription(subscribeToMore);
        setSubscribed(true)
    }

    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error :(</p>; }
    if (!data || !data.findAllTasks) { return <p>No Data :(</p>; }

    console.log("Data from server", data.findAllTasks);
    const { offlineMutate } = useSyncClient()
    return (
        <List divided selection verticalAlign='middle' relaxed="very">
            {data.findAllTasks.map((task) => (
                <TaskItem task={task} onTaskAssign={taskAssignment(offlineMutate)} key={task.id} />
            ))}
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

