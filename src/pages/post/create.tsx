import * as React from "react";
import { PostForm } from '../../components/post-form';
import {GetServerSidePropsContext, NextPage} from "next";
import {graphqlOperation, withSSRContext} from "aws-amplify";
import {GraphQLResult} from "@aws-amplify/api-graphql";
import { Text } from "@aws-amplify/ui-react";

interface PageProps {
    blogsError?: string;
    blogsPostId?: string | never[];
}

const PostFormPage: NextPage<PageProps> = ({ blogsPostId, blogsError }) => {
    if (blogsError) {
        return (
            <Text>{blogsError}</Text>
        )
    }
    return blogsPostId
        ? <PostForm blogsPostId={blogsPostId} />
        : <div>No blog found</div>
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const SSR = withSSRContext(ctx);
    const props: PageProps = {
        blogsPostId: ''
    }
    try {
        // TODO: haal de blogs op en gebruik de eerste om het blogsPostId te vullen
    } catch (err) {
        console.log(err);
        props.blogsPostId = '';
        props.blogsError = (err as Error).message || 'Something went wrong';
    }

    return {props};
}

export default PostFormPage;
