import type {GetServerSidePropsContext, NextPage} from 'next'
import {withSSRContext} from "aws-amplify";
import {Post} from "../API";
import {PostsList} from '../components/posts-list';
import {Nullable} from "../util/types";

interface PageProps {
    posts: Nullable<Pick<Post, "id" | "title">>[],
    postsError?: string;
}

const Home: NextPage<PageProps> = ({posts, postsError}) => {
    return (
        <div>
            <PostsList posts={posts} postsError={postsError}/>
        </div>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const SSR = withSSRContext(ctx);
    const props: PageProps = {
        posts: [],
    }
    try {
        // TODO: retrieve the posts
    } catch (err) {
        console.log('Error while retrieving posts: ', err);
        props.postsError = (err as Error).message || 'Something went wrong';
    }
    return {props};
}

export default Home;
