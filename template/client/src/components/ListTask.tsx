import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { List } from 'semantic-ui-react'
import { TaskQuery } from '../graphql/queries/Tasks';

export const Tasks: React.FC = () => {
    const { loading, error, data } = useQuery(TaskQuery, {
        fetchPolicy: "cache-and-network"
    });

    if (loading) { return <p>Loading...</p>; }
    if (error) { return <p>Error :(</p>; }
    if (!data || !data.findAllTasks) { return <p>No Data :(</p>; }

    console.log("Data from server", data.findAllTasks);

    return data.findAllTasks.map(({ title, description }) => (
        <List>
            <List.Item>
                <List.Content>
                    <List.Header >{title}</List.Header>
                    <List.Description> {description}</List.Description>
                </List.Content>
            </List.Item>
        </List>
    ));
};