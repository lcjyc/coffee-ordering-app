import styles from "../styles/CoverList.module.css";
import Image from "next/image";
import Link from "next/link";

const CoverList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>KEEP CALM AND DRINK COFFEE!</h1>
      <h2 className={styles.desc}>
        We provide fresh roasted coffee with love.
        <br />
        You can order tasty coffee drinks, <br />
        or select different coffee beans now!
        <br />
      </h2>
      <div className={styles.wrapper}>
        <div className={styles.select}>
          <Link href="/drinks" passHref>
            <Image
              src="/img/coffeedrink.png"
              alt=""
              width="250px"
              height="250px"
              className={styles.img}
            />
          </Link>
          <Link href="/drinks" passHref>
            <h2 className={styles.drink}>Order Coffee Drinks</h2>
          </Link>
        </div>
        <div className={styles.select}>
          <Link href="/beans" passHref>
            <Image
              src="/img/coffeebeans.png"
              alt=""
              width="250px"
              height="250px"
              className={styles.img}
            />
          </Link>
          <Link href="/beans" passHref>
            <h2 className={styles.bean}>Select Coffee Beans</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoverList;
