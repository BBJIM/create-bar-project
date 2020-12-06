import { gql, useQuery } from '@apollo/client';
import { currentUserVar } from 'Apollo/Vars';
import { User } from 'Common/Models';
import { removeToken, saveToken } from 'Common/Utils/Cookies';

export const LOGIN = gql`
	mutation login($email: String, $password: String) {
		login(email: $email, password: $password) {
			_id
			email
			firstName
			lastName
			role {
				_id
				name
			}
			token
		}
	}
`;

export const REGISTER = gql`
	mutation register(
		$firstName: String
		$lastName: String
		$email: String
		$password: String
		$phoneNumber: String
		$birthDate: String
		$role: String
	) {
		register(
			email: $email
			password: $password
			email: $email
			password: $password
			phoneNumber: $phoneNumber
			birthDate: $birthDate
			role: $role
		) {
			_id
			email
			firstName
			lastName
			role {
				_id
				name
			}
			token
		}
	}
`;

export const setCurrentUser = (value: User | null): void => {
	currentUserVar(value);
	if (value && value.token) {
		saveToken(value.token);
	}
};

export const logout = (): void => {
	setCurrentUser(null);
	removeToken();
};

export const GET_AUTH_STATE = gql`
	query getAuthState {
		currentUserState @client
	}
`;

export const useAuthQuery = () => {
	const { data: authData } = useQuery(GET_AUTH_STATE);
	const { currentUserState } = authData ? authData : { currentUserState: null };
	return currentUserState;
};
