import { SchemaComposer } from 'graphql-compose';
import { RoleMutation, RoleQuery } from './Role';
import { UserMutation, UserQuery } from './User';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
	...UserQuery,
	...RoleQuery,
});

schemaComposer.Mutation.addFields({
	...UserMutation,
	...RoleMutation,
});

export default schemaComposer.buildSchema();
