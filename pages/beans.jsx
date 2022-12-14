import BeanCard from "../components/BeanCard";
import { axiosInstance } from "../util/config";
import styles from "../styles/Beans.module.css";

const Beans = ({ beanList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wanna brew coffee for yourself ?</h1>
      <p className={styles.desc}>
        You can select coffee beans from different origins with various flavors!
      </p>
      <div className={styles.wrapper}>
        {beanList.map((bean) => (
          <BeanCard key={bean._id} bean={bean} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axiosInstance.get("/beans");
  return {
    props: {
      beanList: res.data,
    },
  };
};

export default Beans;
