export type GenericFormValues = {
	name: string;
	email: string;
	phoneNumber: string;
	file: File;
	files: File[];
	text: string;
	select: string;
	checkbox: boolean;
	checkbox2: boolean;
	date: string;
	radio: string;
	range: number;
};

export type LoginFormValues = {
	email: string;
	password: string;
};

export type RegisterFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	role: string;
	birthDate: string;
};

export type RoleFormValues = {
	name: string;
};
