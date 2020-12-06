import { gql, useQuery } from '@apollo/client';

export const GET_ROLES = gql`
	query roleMany {
		roleMany {
			_id
			name
		}
	}
`;

export const CREATE_ROLE = gql`
	mutation createRole($name: String!) {
		createRole(name: $name) {
			_id
			name
		}
	}
`;

export const UPDATE_ROLE = gql`
	mutation updateRole($_id: String!, $name: String!) {
		updateRole(_id: $_id, name: $name) {
			_id
			name
		}
	}
`;

export const DELETE_ROLE = gql`
	mutation deleteRoles($_id: [String!]) {
		deleteRoles(_id: $_id) {
			deleted
		}
	}
`;

export const LOCAL_UPDATE_ROLES = gql`
	mutation updateRoles($_id: String!, $name: String) {
		updateRoles(_id: $_id, name: $name) @client
	}
`;

export const LOCAL_DELETE_ROLES = gql`
	mutation deleteRoles($ids: [String!]) {
		deleteRoles(ids: $ids) @client
	}
`;

export const useRoleQuery = () => {
	const { data: rolesData } = useQuery(GET_ROLES);
	const { roleMany: roles } = rolesData ? rolesData : { roleMany: [] };
	return roles;
};
