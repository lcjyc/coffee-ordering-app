import { axiosInstance } from "../../util/config";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Edit.module.css";
import AddDrinks from "../../components/AddDrinks";
import AddBeans from "../../components/AddBeans";

const Edit = ({ drinks, beans }) => {
  const [drinkList, setDrinkList] = useState(drinks);
  const [beanList, setBeanList] = useState(beans);
  const [addDrinks, setAddDrinks] = useState(false);
  const [addBeans, setAddBeans] = useState(false);

  const handleDeleteDrink = async (id) => {
    try {
      await axiosInstance.delete("/drinks/" + id);
      alert("Product has been deleted.");
      window.location.reload();
      setDrinkList(drinkList.filter((drink) => drink._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBean = async (id) => {
    try {
      await axiosInstance.delete("/beans/" + id);
      alert("Product has been deleted.");
      window.location.reload();
      setBeanList(beanList.filter((bean) => bean._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <div className={styles.drinks}>
          <h1 className={styles.title}>Drinks</h1>
          <button
            className={styles.addButton}
            onClick={() => setAddDrinks(true)}
          >
            Add New Product [Drinks]
          </button>
          {addDrinks && <AddDrinks setAddDrinks={setAddDrinks} />}
        </div>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </tbody>
          {drinks.map((drink) => (
            <tbody key={drink._id}>
              <tr>
                <td>
                  <Image
                    src={drink.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{drink._id}</td>
                <td className={styles.product}>{drink.title}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteDrink(drink._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
      <section className={styles.right}>
        <div className={styles.beans}>
          <h1 className={styles.title}>Beans</h1>
          <button
            className={styles.addButton}
            onClick={() => setAddBeans(true)}
          >
            Add New Product [Beans]
          </button>
          {addBeans && <AddBeans setAddBeans={setAddBeans} />}
        </div>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </tbody>
          {beans.map((bean) => (
            <tbody key={bean._id}>
              <tr>
                <td>
                  <Image
                    src={bean.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{bean._id}</td>
                <td className={styles.product}>{bean.title}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteBean(bean._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const drinkRes = await axiosInstance.get("/drinks");
  const beanRes = await axiosInstance.get("/beans");

  return {
    props: {
      drinks: drinkRes.data,
      beans: beanRes.data,
    },
  };
};

export default Edit;
