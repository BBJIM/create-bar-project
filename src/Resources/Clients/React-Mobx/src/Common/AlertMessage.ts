import cogoToast from 'cogo-toast';

export const alertMessage = cogoToast;

export const alertStrings = {
	logInSuccess: 'Logged In Successfully',
	logOutSuccess: 'Logged Out Successfully',
	logInError: 'Could Not Log In To The System',
	registerError: 'Could Not Register, email already exists',
	noAccess: 'You must log in as admin to access this page',
};

export const hideAfterTimeSec = 3;
