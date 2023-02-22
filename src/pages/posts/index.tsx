import Head from "next/head";
import styles from './styles.module.scss'
export default function Posts(){
    return(
        <>
        <Head>
            <title>Posts | Ignews</title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                <a href="#">
                    <time>12 de março de 2021</time>
                    <strong>Lorem ipsum, dolor sit amet </strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatum modi magni maiores, exercitationem minima maxime recusandae obcaecati, est dolore eum? Fugit sed quaerat temporibus. Molestias nulla dolores tempore vitae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora culpa, accusantium impedit voluptatibus pariatur recusandae. Fuga voluptatibus odio quas molestiae, nisi laboriosam magnam voluptatem laborum quisquam maiores velit, est vitae!</p>

                </a>
                <a href="#">
                    <time>12 de março de 2021</time>
                    <strong>Lorem ipsum, dolor sit amet </strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatum modi magni maiores, exercitationem minima maxime recusandae obcaecati, est dolore eum? Fugit sed quaerat temporibus. Molestias nulla dolores tempore vitae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora culpa, accusantium impedit voluptatibus pariatur recusandae. Fuga voluptatibus odio quas molestiae, nisi laboriosam magnam voluptatem laborum quisquam maiores velit, est vitae!</p>

                </a>
                <a href="#">
                    <time>12 de março de 2021</time>
                    <strong>Lorem ipsum, dolor sit amet </strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatum modi magni maiores, exercitationem minima maxime recusandae obcaecati, est dolore eum? Fugit sed quaerat temporibus. Molestias nulla dolores tempore vitae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora culpa, accusantium impedit voluptatibus pariatur recusandae. Fuga voluptatibus odio quas molestiae, nisi laboriosam magnam voluptatem laborum quisquam maiores velit, est vitae!</p>

                </a>
               
            </div>
        </main>
        </>
    )
}