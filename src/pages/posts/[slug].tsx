import { getPrismicClient } from "@/services/prismic"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { RichText } from "prismic-dom"


interface PostProps {
   post: {
      slug: string;
      title: string;
      content: string;
      updatedAt: string;
   }
}

export default function Post({ post }: PostProps) {
   return (
      <>
         <Head>
            <title>{post.title} | Ignews</title>
         </Head>
         <main>
            <article>
               <h1>{post.title}</h1>
               <time>{post.updatedAt}</time>
               <div dangerouslySetInnerHTML={{__html:post.content}}/>
            </article>
         </main>
      </>)
}

export const getServerSideProps = async ({ req, params }: any) => {
   const session = await getSession({ req })
   const { slug } = params
   // if (!session) {}

   const prismic = getPrismicClient(req)
   const response = await prismic.getByUID<any>("post", String(slug), {});
   // console.log(response.data)

   const post = {
      slug: response.uid,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString(
         "pt-BR",
         {
            day: "2-digit",
            month: "long",
            year: "numeric",
         }
      ),
   };

   return { props: { post, } }
}