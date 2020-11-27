import Role from './Role';

class User {
	_id = '';
	firstName = '';
	lastName = '';
	email = '';
	phoneNumber = '';
	role: Role = { _id: '', name: '' };
	token = '';
}

export default User;
