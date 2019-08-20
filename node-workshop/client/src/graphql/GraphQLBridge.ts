import { buildASTSchema, parse, visit } from 'graphql';
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { schema } from './schema'

const compiledSchema = buildASTSchema(parse(schema))
const schemaType = compiledSchema.getType('Task');

const schemaData = {
};

visit(parse(schema), {
    FieldDefinition(node) {
        schemaData[node.name.value] = {
            label: node.name.value
        };
    }
})

// tslint:disable-next-line: no-any
const schemaValidator = (model: any) => {
 
};

export const TaskSchema = new GraphQLBridge(schemaType, schemaValidator, schemaData);
