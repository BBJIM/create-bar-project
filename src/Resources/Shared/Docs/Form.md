# Forms Validation with Formik And Yup

-   In this project we use the Formik library and the Yup library to build validations to our forms
    -To build a validation to a field in a form we use a yup schema like so-

```
const emailYup = Yup.string()
	.email(emailMessage)
	.required(requiredMessage);
```

-   This example is a validation for an email field-the validation says it is a required field and it must look like an email (a@email.com) we then can build a schema that will use this validation.

```
public static emailValidationSchema =
        Yup.object().shape({
		email: emailYup,
	});
```

-   this example shows that the field with the prop of `name` that has the value `name` will have this validation. for more validations examples you can go to the `Validations` folder in Common.

In order to add the validation to our form we wiil wrap our form with our custom component `FormWrapper.tsx` that use`s the formik library. In order to use the form wrapper and formik we need to pass 3 props to the form wrapper:

1. The initial values for the forms- those will be the names of the fields(the field will have a prop `name`)
1. The validation schema- like the one we saw before(the `emailValidationSchema`)
1. The onSubmit method- the method that will be called when the button of type `submit` in your form is pressed

<br>
there is an example of a form in the Form Container

-   There are other things we get from formik like the `handleChange` and `handleBlur` props that works automaticly on the fields. another example is the `errors` and `touched` props that we can use to show our errors from the validation.

-   For more information on formik, you can go here -https://jaredpalmer.com/formik/docs/overview
