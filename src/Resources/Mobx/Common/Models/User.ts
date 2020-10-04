import Role from './Role';

class User {
	_id: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	phoneNumber: string = '';
	role: Role = { _id: '', name: '' };
	token: string = '';
}

export default User;
