import * as Yup from 'yup';
// https://www.npmjs.com/package/yup

const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ['*/image', '/*video', 'text/plain'];

// TODO: fix errors
const requiredMessage = 'Required';
const emailMessage = 'Email must be like this a@a.com';
const phoneMessage = 'Phone not good';
const nameTooLongMessage = 'Name too long';
const textTooLongMessage = 'Text too long';
const fileSizeTooLarge = 'File/s Size is too large';
const fileTypeNotSupported = 'Unsupported File Format';
const checkboxMessage = 'Must Check This';
const passwordMessage = 'min 8 letters, max 14, must contain at least one capital letter and one small letter ';

const emailRegex = /^[^<>()[\]\\,;:#^\s@$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,})|(([a-zA-Z0-9]+[-]+[a-zA-Z0-9]+\.)+[a-zA-Z]{2,})+((\.{0,1})+[a-zA-Z]{2,}){0,1})+$/;

const requiredYup = Yup.string().required(requiredMessage);

// const phoneYup = Yup.string()
// 	.nullable()
// 	.test('phone', phoneMessage, (value) => !value || value.length === 0 || (/^[0-9]+$/i.test(value) && value.length === 10));

const emailYup = Yup.string()
	.required(requiredMessage)
	.test('email', emailMessage, (value) => !value || emailRegex.test(value));

const nameYup = Yup.string().required(requiredMessage).max(20, nameTooLongMessage);

const textYup = Yup.string().required(requiredMessage).max(500, textTooLongMessage);

const phoneRequiredYup = Yup.string()
	.required(requiredMessage)
	.test('phone', phoneMessage, (value) => !value || (/^[0-9]+$/i.test(value) && value.length === 10));

const filesYup = Yup.mixed()
	.test('fileSize', fileSizeTooLarge, (value) => {
		if (value) {
			let finalSize: number = 0;
			Array.from(value).forEach((v: any) => {
				finalSize += v.size;
			});
			return finalSize <= FILE_SIZE;
		}
		return true;
	})
	.test('fileType', fileTypeNotSupported, (value) => {
		if (value) {
			let typeFlag = true;
			Array.from(value).forEach((v: any) => {
				if (typeFlag) {
					typeFlag = SUPPORTED_FORMATS.includes(v.type);
				}
			});
			return typeFlag;
		}
		return true;
	});

const fileYup = Yup.mixed()
	.test('fileSize', fileSizeTooLarge, (value) => (value ? value.size <= FILE_SIZE : true))
	.test('fileType', fileTypeNotSupported, (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true));

const checkboxYup = Yup.boolean().test('checkbox', checkboxMessage, (value) => value as boolean);

const passwordYup = Yup.string()
	.required(requiredMessage)
	.test('password', passwordMessage, (val) =>
		/(?=(?:.*[A-Z].*){1})(?=(?:.*[a-z].*){1})(?=(?:.*[0-9].*){1})/.test(val as string),
	)
	.min(8, passwordMessage)
	.max(14, passwordMessage);

export const loginSchema = Yup.object().shape({
	email: emailYup,
	password: passwordYup,
});

export const registerSchema = Yup.object().shape({
	firstName: nameYup,
	lastName: nameYup,
	email: emailYup,
	password: passwordYup,
	phoneNumber: phoneRequiredYup,
	birthDate: requiredYup,
	role: requiredYup,
});

export const simpleFormSchema = Yup.object().shape({
	name: nameYup,
	email: emailYup,
	phone: phoneRequiredYup,
	file: fileYup,
	files: filesYup,
	text: textYup,
	checkbox: checkboxYup,
});

export const roleSchema = Yup.object().shape({
	name: nameYup,
});
