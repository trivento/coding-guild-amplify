import * as React from "react";
import * as yup from "yup";
import {useFormHandler} from "../hooks/use-form-handler";
import {Button, Flex, TextField, Text, Loader, Card} from "@aws-amplify/ui-react";

interface RegisterFormProps {
    username: string;
    onSubmit: (values: any) => void;
    errorMessage: string;
}

export const ConfirmRegistrationForm: React.FC<RegisterFormProps> = ({username, onSubmit, errorMessage}) => {
    const schema = yup.object({
        code: yup.string().required()
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
                    <input
                        name="username"
                        type="hidden"
                        value={username}
                    />
                    <TextField
                        label="Verificatiecode"
                        name="code"
                        type="password"
                        value={formHandler.values.code}
                        hasError={formHandler.hasError('code')}
                        errorMessage={formHandler.errors.code}
                        onChange={formHandler.onFieldChange}
                    />
                    <Button type="submit" disabled={formHandler.isSubmitting}>{formHandler.isSubmitting &&
                        <Loader/>} Bevestigen</Button>
                </Flex>
            </form>
        </Card>
    )
}
