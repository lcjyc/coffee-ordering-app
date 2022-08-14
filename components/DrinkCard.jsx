import styles from "../styles/DrinkCard.module.css";
import Image from "next/image";
import Link from "next/link";

const DrinkCard = ({ coffee }) => {
  return (
    <div className={styles.container}>
      <Link href={`/drink/${coffee._id}`} passHref>
        <Image
          src={coffee.img}
          alt=""
          width="700"
          height="700"
          className={styles.img}
        />
      </Link>
      <Link href={`/drink/${coffee._id}`} passHref>
        <h2 className={styles.title}>{coffee.title}</h2>
      </Link>
      <p className={styles.desc}>{coffee.desc}</p>
    </div>
  );
};

export default DrinkCard;
