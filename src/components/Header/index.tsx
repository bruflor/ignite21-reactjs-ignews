import { SignButton } from "../SignInButton";
import Link from 'next/link'

import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";


export default function Header() {


  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
        
          <ActiveLink activeClassName={styles.active}  href='/'><span>Home</span></ActiveLink>
         
          <ActiveLink href='/posts' activeClassName={styles.active}><span>Posts</span></ActiveLink>
        
        </nav>

        <SignButton />
      </div>
    </header>
  );
}
