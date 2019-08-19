import { taskResolvers } from './generated/task'

import { customResolvers } from './custom'

export const resolvers = [taskResolvers, ...customResolvers]
