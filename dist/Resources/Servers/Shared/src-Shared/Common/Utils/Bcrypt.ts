import bcrypt from 'bcrypt';

const cryptPassword = (password: string) => {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

export default cryptPassword;
