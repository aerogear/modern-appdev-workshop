import React from 'react'
import { List, Checkbox } from 'semantic-ui-react'

export interface TaskItemProps {
  task: any
  onTaskAssign: any
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskAssign }) => {

  const onToggle = (_: any, { checked }: { checked?: boolean }) => {
    const status = checked === true ? 'assigned' : 'open'
    onTaskAssign(task.id, status, task.version)
  }

  return (
    <List.Item>
      <List.Content floated='right'>
        <Checkbox toggle onChange={onToggle} />
      </List.Content>
      <List.Header >{task.title}</List.Header>
      <List.Description> {task.description} [v{task.version}]</List.Description>
    </List.Item >
  )
};
