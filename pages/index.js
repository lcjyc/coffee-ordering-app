import Head from "next/head";
import CoverList from "../components/CoverList";
import Featured from "../components/Featured";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Ordering App</title>
        <meta name="description" content="Coffee Ordering App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <CoverList />
    </div>
  );
}
