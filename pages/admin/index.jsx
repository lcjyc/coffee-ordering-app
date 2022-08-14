import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.order}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>NT {order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <th>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <Link href="/admin/edit" passHref>
        <button className={styles.edit}>Edit Products</button>
      </Link>
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
  const orderRes = await axios.get("http://localhost:3000/api/orders");
  return {
    props: {
      orders: orderRes.data,
    },
  };
};

export default Index;
