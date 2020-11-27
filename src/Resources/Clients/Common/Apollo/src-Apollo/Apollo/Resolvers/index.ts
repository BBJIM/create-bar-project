import { InMemoryCache } from '@apollo/client';
import { Role } from 'Common/Models';
import { GET_ROLES } from 'Logic/Role';

export const resolvers = {
	Mutation: {
		// add, update or remove one role
		updateRoles: (_: any, { _id, name }: Role, { cache }: { cache: InMemoryCache }): Role[] => {
			const queryResult: { roleMany: Role[] } | null = cache.readQuery({
				query: GET_ROLES,
			});
			if (queryResult) {
				const { roleMany } = queryResult;
				let updatedArr;
				const index = roleMany.findIndex((role: Role) => role._id === _id);
				if (index !== -1) {
					if (name) {
						const tempArr = [...roleMany];
						tempArr[index] = { ...roleMany[index], name };
						updatedArr = [...tempArr];
					} else {
						updatedArr = roleMany.filter((role: Role) => role._id !== _id);
					}
				} else {
					updatedArr = [...roleMany, { _id, name }];
				}
				const data = {
					roleMany: updatedArr,
				};
				cache.writeQuery({ query: GET_ROLES, data });
				return data.roleMany;
			}
			return [];
		},
		deleteRoles: (_: any, { ids }: { ids: string[] }, { cache }: { cache: InMemoryCache }): Role[] => {
			const queryResult: { roleMany: Role[] } | null = cache.readQuery({
				query: GET_ROLES,
			});
			if (queryResult) {
				const { roleMany } = queryResult;
				const updatedArr = roleMany.filter(({ _id }: Role) => !ids.includes(_id));
				const data = {
					roleMany: updatedArr,
				};
				cache.writeQuery({ query: GET_ROLES, data });
				return data.roleMany;
			}
			return [];
		},
	},
};
