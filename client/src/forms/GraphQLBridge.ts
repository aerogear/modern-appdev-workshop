import { buildASTSchema, parse, visit } from 'graphql';
import { GraphQLBridge } from 'uniforms-bridge-graphql';
import { schema } from '../schema'

const compiledSchema = buildASTSchema(parse(schema))
const schemaType = compiledSchema.getType('Post');


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
    // tslint:disable-next-line: no-any
    const details: any = [];
    if (!model.id) {
        details.push({ name: 'id', message: 'ID is required!' });
    }
    // ...
    if (details.length) {
        throw { details };
    }
};

export const PostSchema = new GraphQLBridge(schemaType, schemaValidator, schemaData);
