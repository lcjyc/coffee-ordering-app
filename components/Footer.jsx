import styles from "../styles/Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/cafesign.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            NEED COFFEE ? <br />
            <br />
            WE BREW DELICIOUS COFFEE FOR YOU!
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR COFFEE SHOP</h1>
          <h3 className={styles.text}>
            Taipei City
            <br /> 02-6666-8888
          </h3>
          <h3 className={styles.text}>
            New Taipei City
            <br /> 02-6666-9999
          </h3>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>OPENING HOURS</h1>
          <h3 className={styles.text}>
            MONDAY - FRIDAY
            <br /> 9:00 – 20:00
          </h3>
          <h3 className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 22:00
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
