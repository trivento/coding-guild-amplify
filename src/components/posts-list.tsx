import * as React from "react";
import Link from "next/link";
import {Post} from "../API";
import {Text} from "@aws-amplify/ui-react";
import {Nullable} from "../util/types";

interface PostsListProps {
    posts: Nullable<Pick<Post, "id" | "title">>[];
    postsError?: string;
}

export const PostsList: React.FC<PostsListProps> = ({posts, postsError}) => {
    if (posts.length === 0) {
        return (
            <Text>Geen blog posts gevonden!</Text>
        )
    }

    if (postsError) {
        return (
            <Text>{postsError}</Text>
        );
    }

    return (
        <ul>
            {posts.map(post => (
                post && (
                    <li key={post.id}>
                        <Link href={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                )
            ))}
        </ul>
    )
}
