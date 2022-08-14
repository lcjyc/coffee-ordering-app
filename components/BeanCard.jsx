import styles from "../styles/BeanCard.module.css";
import Image from "next/image";
import Link from "next/link";

const BeanCard = ({ bean }) => {
  return (
    <div className={styles.container}>
      <Link href={`/bean/${bean._id}`} passHref>
        <Image
          src={bean.img}
          alt=""
          width="600"
          height="450"
          className={styles.img}
        />
      </Link>
      <Link href={`/bean/${bean._id}`} passHref>
        <h1 className={styles.title}>{bean.title}</h1>
      </Link>
      <p className={styles.desc}>{bean.desc}</p>
    </div>
  );
};

export default BeanCard;
