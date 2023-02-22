import { getPrismicClient } from "@/services/prismic";
import Head from "next/head";
import { RichText } from "prismic-dom"
import styles from './styles.module.scss'

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
    // const prismic = getPrismicClient();
    // console.log(prismic)


    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <a href="#">
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>

                        </a>
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

    console.log(result);

    return {
        props: { posts },
    };
}