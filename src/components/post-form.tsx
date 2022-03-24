import {Button, Card, Loader, TextAreaField, TextField, Text} from "@aws-amplify/ui-react";
import * as React from "react";
import * as yup from 'yup';
import {useFormHandler} from "../hooks/use-form-handler";

interface PostFormProps {
    blogsPostId: string | never[];
}

export const PostForm: React.FC<PostFormProps> = ({ blogsPostId }) => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const schema = yup.object({
        title: yup.string().required(),
        body: yup.string().required(),
        blogsPostId: yup.string(),
    });

    const formHandler = useFormHandler<yup.InferType<typeof schema>>(schema, async (values) => {
        try {
            // TODO: sla de nieuwe post op met graphql en stuur de gebruiker dan door naar de post
            //     await router.push(`/post/${newPostId}`);
        } catch (err) {
            setErrorMessage((err as Error).message);
        }
    });

    return (
        <Card>
            {errorMessage && <Text>{errorMessage}</Text>}
            <form onSubmit={formHandler.onSubmit}>
                <input type="hidden" name="blogsPostId" value={blogsPostId} />
                <TextField
                    label="title"
                    name="title"
                    value={formHandler.values.title}
                    hasError={formHandler.hasError('title')}
                    errorMessage={formHandler.errors.title}
                    onChange={formHandler.onFieldChange}
                />
                <TextAreaField
                    label="body"
                    name="body"
                    value={formHandler.values.body}
                    hasError={formHandler.hasError('body')}
                    errorMessage={formHandler.errors.body}
                    onChange={formHandler.onFieldChange}
                />
                <Button type="submit" disabled={formHandler.isSubmitting}>{formHandler.isSubmitting &&
                    <Loader/>} Opslaan</Button>
            </form>
        </Card>
    )
}
