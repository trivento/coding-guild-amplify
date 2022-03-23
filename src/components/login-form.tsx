import * as React from "react";
import * as yup from "yup";
import {useFormHandler} from "../hooks/use-form-handler";
import {Button, Flex, TextField, Text, Loader, Card} from "@aws-amplify/ui-react";

interface LoginFormProps {
    onSubmit: (values: any) => void;
    errorMessage: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({onSubmit, errorMessage}) => {
    const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required()
    });

    const formHandler = useFormHandler<yup.InferType<typeof schema>>(
        schema,
        (values) => {
            onSubmit(values);
        }
    );

    return (
        <Card>
            <form onSubmit={formHandler.onSubmit}>
                <Flex direction="column">
                    {errorMessage && <Text>{errorMessage}</Text>}
                    <TextField
                        name="username"
                        label="e-mail adres"
                        value={formHandler.values.username}
                        hasError={formHandler.hasError('username')}
                        errorMessage={formHandler.errors.username}
                        onChange={formHandler.onFieldChange}
                    />
                    <TextField
                        label="wachtwoord"
                        name="password"
                        type="password"
                        value={formHandler.values.password}
                        hasError={formHandler.hasError('password')}
                        errorMessage={formHandler.errors.password}
                        onChange={formHandler.onFieldChange}
                    />
                    <Button type="submit" disabled={formHandler.isSubmitting}>{formHandler.isSubmitting &&
                        <Loader/>} Inloggen</Button>
                </Flex>
            </form>
        </Card>
    )
}
