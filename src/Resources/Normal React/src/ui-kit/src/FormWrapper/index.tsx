import { Formik, FormikErrors, FormikTouched } from 'formik';
import React from 'react';

type Props = {
	children: any;
	initialValues: any;
	validationSchema: any;
	onSubmit: any;
	scrollToError?: boolean;
};

/**
 * Scroll to first element with the name of 'active-error'.
 * Use this in submit buttons in forms if you want the website to scroll
 * to the first input with error
 */
export const scrollToFirstError = (): void => {
	let firstrealItem: HTMLElement;
	setTimeout(() => {
		const errors = document.getElementsByName('active-error');
		if (errors.length > 0) {
			for (const error of Array.from(errors)) {
				if (!firstrealItem && (error as HTMLElement).getBoundingClientRect().height !== 0) {
					firstrealItem = error as HTMLElement;
					break;
				}
			}
			if (firstrealItem) {
				firstrealItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}
	}, 200);
};

export const getFormError = (
	errors: FormikErrors<any>,
	touched: FormikTouched<any>,
	id: string,
): string | undefined => {
	if (errors[id] && touched[id]) {
		return errors[id] as string;
	}
};

// if you think the form doesnt work, you might have forgotten to add an appropriate validation schema
const FormWrapper = ({ children, initialValues, validationSchema, onSubmit }: Props): JSX.Element => {
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{/* 'children' = The form that will be wrapped */}
			{children}
		</Formik>
	);
};

export default FormWrapper;
