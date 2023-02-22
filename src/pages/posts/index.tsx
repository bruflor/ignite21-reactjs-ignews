import { getPrismicClient } from "@/services/prismic";
import { RichText } from "prismic-dom"
import Head from "next/head";
import styles from './styles.module.scss'
import Link from "next/link";

interface PostsProps {
    posts: Post[]
}
type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;

}

export default function Posts({ posts }: PostsProps) {

    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link href={`/posts/${post.slug}`} key={post.slug}>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>

                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const prismic = getPrismicClient()

    const result = await prismic.getByType("post", {
        pageSize: 100,
    });

    const posts = result.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? "",
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: { posts },
    };
}