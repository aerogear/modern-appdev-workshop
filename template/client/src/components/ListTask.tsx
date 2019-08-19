import { CacheOperation, createSubscriptionOptions } from '@aerogear/voyager-client';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { List } from 'semantic-ui-react'
import { TaskQuery } from '../graphql/queries/Tasks';
import { TaskCreateSubscription } from '../graphql/subscriptions/NewTask';
import { TaskItem } from './TaskItem';
import { useSyncClient } from '../helpers/useDataSyncClient';
import { AssignTaskMutation } from '../graphql/mutations/TaskMutation';

export const Tasks: React.FC = () => {
    const { loading, error, data, subscribeToMore } = useQuery(TaskQuery, {
        fetchPolicy: "cache-and-network"
    })

    const { offlineMutate } = useSyncClient()

    initSubscription(subscribeToMore);

    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error :(</p>; }
    if (!data || !data.findAllTasks) { return <p>No Data :(</p>; }

    console.log("Data from server", data.findAllTasks);

    const assignTask = (id: string, status: string) => {
        console.log('assign task', status)
        offlineMutate({
          mutation: AssignTaskMutation,
          updateQuery: TaskQuery,
          variables: { id, status },
          returnType: "Task",
        }).then(() => {
          // Cache is updated so no action here
        }).catch((error) => {
          if (error.networkError && error.networkError.offline) {
              error.networkError.watchOfflineChange().then(() => {
                  console.log("Change was replicated to server")
              });
              console.log("Change enqueued for offline")
          }
          console.log(error);
        })
      }

    return (
        <List divided relaxed="very">
            {data.findAllTasks.map((task) => (<TaskItem task={task} onTaskAssign={assignTask} key={task.id} />))}
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

