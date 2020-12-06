import { RoleTC } from 'Common/Models/Role';
import { verifyToken } from 'Common/Utils/VerifyToken';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { createModel, deleteModels, updateModel } from 'Logic';

const RoleReturnType = (name: string) =>
	new GraphQLObjectType({
		name,
		fields: () => ({
			_id: { type: GraphQLString },
			name: { type: GraphQLString },
		}),
	});

const DeleteRoleReturnType = new GraphQLObjectType({
	name: 'deleteRoles',
	fields: () => ({
		deleted: { type: GraphQLString },
	}),
});

RoleTC.addResolver({
	kind: 'mutation',
	name: 'createRole',
	args: {
		name: 'String!',
	},
	type: RoleReturnType('createRole'),
	resolve: async ({ args }) => {
		return await createModel('role', args);
	},
});

RoleTC.addResolver({
	kind: 'mutation',
	name: 'updateRole',
	args: {
		_id: 'String!',
		name: 'String!',
	},
	type: RoleReturnType('updateRole'),
	resolve: async ({ args: { name, _id } }) => {
		return await updateModel('role', { name }, { _id });
	},
});

RoleTC.addResolver({
	kind: 'mutation',
	name: 'deleteRoles',
	args: {
		_id: '[String!]',
	},
	type: DeleteRoleReturnType,
	resolve: async ({ args }) => {
		const { deletedCount } = await deleteModels('role', args);
		return { deleted: deletedCount };
	},
});

const RoleQuery = {
	roleById: RoleTC.getResolver('findById'),
	roleOne: RoleTC.getResolver('findOne'),
	roleMany: RoleTC.getResolver('findMany'),
};

const RoleMutation = {
	createRole: RoleTC.getResolver('createRole', [verifyToken]),
	updateRole: RoleTC.getResolver('updateRole', [verifyToken]),
	deleteRoles: RoleTC.getResolver('deleteRoles', [verifyToken]),
};

export { RoleQuery, RoleMutation };
