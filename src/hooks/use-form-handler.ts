import * as yup from "yup";
import * as React from "react";

export function useFormHandler<Values extends {}>(
    schema: yup.AnySchema,
    submitHandler: (values: Values) => void
) {
    type Errors = { [FieldName in keyof Values]: string; };

    const [values, setValues] = React.useState<Values>({} as Values);
    const [errors, setErrors] = React.useState<Errors>({} as Errors);
    const [isSubmitting, setSubmitting] = React.useState(false);

    const hasError = (fieldName: keyof Errors) => errors[fieldName] && errors[fieldName] !== '';

    const onFieldChange = React.useCallback((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const fieldName = event.currentTarget.name;
        const value = event.currentTarget.value;
        setValues((prevValues: Values) => ({
                ...prevValues,
                [fieldName]: value
            })
        )
    }, []);

    const onSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        schema.validate(values, {abortEarly: false})
            .then((isFormValid) => {
                if (isFormValid) {
                    setSubmitting(true);
                    submitHandler(values);
                    setSubmitting(false);
                }
            })
            .catch((err) => {
            const errors = err.inner.reduce((acc: Record<string, boolean>, error: yup.ValidationError) => {
                return error.path
                    ? {
                        ...acc,
                        [error.path]: error.message,
                    }
                    : acc
            }, {})

            // Update form errors state:
            setErrors(errors);
        })
    }, [schema, values, submitHandler])

    return {
        values,
        errors,
        hasError,
        onFieldChange,
        onSubmit,
        isSubmitting
    }
}
