import { RoleTC } from 'Common/Models/Role';
import { UserTC } from 'Common/Models/User';
import { verifyToken } from 'Common/Utils/VerifyToken';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { login, register } from 'Logic';

UserTC.addRelation('role', {
	resolver: RoleTC.getResolver('findById'),
	prepareArgs: {
		_id: (source: { role: { name: string } }) => source.role,
		skip: null,
		sort: null,
	},
	projection: { role: true },
});

const AuthReturnType = new GraphQLObjectType({
	name: 'auth',
	fields: () => ({
		_id: { type: GraphQLString },
		email: { type: GraphQLString },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		token: { type: GraphQLString },
		role: {
			type: new GraphQLObjectType({
				name: 'role',
				fields: () => ({
					_id: { type: GraphQLString },
					name: { type: GraphQLString },
				}),
			}),
		},
	}),
});

UserTC.addResolver({
	kind: 'mutation',
	name: 'login',
	args: {
		email: 'String',
		password: 'String',
	},
	type: AuthReturnType,
	resolve: async ({ args, context }) => {
		const token = context.token && context.token !== 'undefined' ? context.token : null;
		const user = { email: args.email, password: args.password };
		const res = await login(token, user);
		return res;
	},
});

UserTC.addResolver({
	kind: 'mutation',
	name: 'register',
	args: {
		email: 'String!',
		password: 'String!',
		firstName: 'String!',
		lastName: 'String!',
		phoneNumber: 'String!',
		birthDate: 'String!',
		role: 'String!',
	},
	type: AuthReturnType,
	resolve: async ({ args }) => {
		return await register(args);
	},
});

const UserQuery = {
	userById: UserTC.getResolver('findById'),
	userByIds: UserTC.getResolver('findByIds'),
	userOne: UserTC.getResolver('findOne'),
	userMany: UserTC.getResolver('findMany'),
};

const UserMutation = {
	userUpdateById: UserTC.getResolver('updateById', [verifyToken]),
	userUpdateOne: UserTC.getResolver('updateOne', [verifyToken]),
	userUpdateMany: UserTC.getResolver('updateMany', [verifyToken]),
	userRemoveById: UserTC.getResolver('removeById', [verifyToken]),
	userRemoveOne: UserTC.getResolver('removeOne', [verifyToken]),
	userRemoveMany: UserTC.getResolver('removeMany', [verifyToken]),
	login: UserTC.getResolver('login'),
	register: UserTC.getResolver('register'),
};

export { UserQuery, UserMutation };
