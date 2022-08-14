import DrinkCard from "../components/DrinkCard";
import { axiosInstance } from "../util/config";
import styles from "../styles/Drinks.module.css";

const Drinks = ({ drinkList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DO YOU NEED COFFEE ?</h1>
      <p className={styles.desc}>
        We make delicious coffee for you !
        <br />
        Order what you want and enjoy it !
      </p>
      <div className={styles.wrapper}>
        {drinkList.map((coffee) => (
          <DrinkCard key={coffee._id} coffee={coffee} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axiosInstance.get("/drinks");
  return {
    props: {
      drinkList: res.data,
    },
  };
};

export default Drinks;
