import * as React from "react";
import {Post} from "../../API";
import {GetServerSidePropsContext, NextPage} from "next";
import {withSSRContext} from "aws-amplify";
import {Card, Text, Heading} from "@aws-amplify/ui-react";
// import {getPost} from "../../graphql/queries";

interface PageProps {
    post: Post | null;
    postError?: string;
}

const PostPage: NextPage<PageProps> = ({ post, postError }) => {
    if (postError) {
        return (
            <Card>
                <Text>{postError}</Text>
            </Card>
        );
    } else if (post) {
        return (
            <Card>
                <Heading level={2}>{post.title}</Heading>
                <Text>{post.body}</Text>
            </Card>
        )
    } else {
        return (
            <Card>
                <Text>Er is iets misgegaan</Text>
            </Card>
        )
    }

}

export async function getServerSideProps(ctx: GetServerSidePropsContext<{ postId: string }>) {
    const props: PageProps = {
        post: null,
    }
    const SSR = withSSRContext(ctx);

    const {postId} = ctx.params || {};
    if (!postId) {
       props.postError = 'Post niet gevonden'
    }

    try {
        const user = await SSR.Auth.currentAuthenticatedUser().catch((err: any) => null);
        // TODO: haal de post data op via graphql, zowel voor ingelogde als anonieme gebruikers
    } catch (err) {
        console.log(err);
        props.postError = (err as Error).message;
    }

    return { props };
}

export default PostPage;
