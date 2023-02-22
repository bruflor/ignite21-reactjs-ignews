import { getPrismicClient } from "@/services/prismic"
import { GetStaticProps } from "next"
import { getSession, useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { RichText } from "prismic-dom"
import { useEffect } from "react"
import styles from "../post.module.scss"

interface PreviewPostProps {
   post: {
      slug: string;
      title: string;
      content: string;
      updatedAt: string;
   }
}

export default function PreviewPost({ post }: PreviewPostProps) {

    const session = useSession()
    const router = useRouter()
    
    useEffect(() => {
        if(session.data?.user !== undefined){
            router.push(`/posts/${post.slug}`)
        }
    }, [session])


    return (
      <>
         <Head>
            <title>{post.title} | Ignews</title>
         </Head>
         <main className={styles.container}>
            <article className={styles.post}>
               <h1>{post.title}</h1>
               <time>{post.updatedAt}</time>
               <div className={`${styles.postContent} ${styles.previewContent}`} dangerouslySetInnerHTML={{__html:post.content}}/>

               <div className={styles.continueReading}>
                Wanna continue reading?
                <Link href="/"><span>Subscribe now 🤗</span></Link>                    
               </div>
            </article>
         </main>
      </>)
}

export const getStaticPaths = () =>{
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
   // const session = false
   const { slug } = params
   // console.log(session?.user)
   

   const prismic = getPrismicClient()
   const response = await prismic.getByUID<any>("post", String(slug), {});
   // console.log(response.data)

   const post = {
      slug: response.uid,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content.splice(0,4)),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString(
         "pt-BR",
         {
            day: "2-digit",
            month: "long",
            year: "numeric",
         }
      ),
   };

   return {
    props: { post, },
    redirect: 60 * 30 //30 minutos
    }
}