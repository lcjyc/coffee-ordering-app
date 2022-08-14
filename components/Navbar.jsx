import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="50px" height="50px" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>02-6666-8888</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <div className={styles.sign}>
            <Image
              src="/img/coffeeholic.png"
              alt=""
              width="240px"
              height="80px"
            />
          </div>
          <Image src="/img/coffeeshop.png" alt="" width="30px" height="30px" />
          <Link href="/" passHref>
            <li title="Homepage" target="_blank" className={styles.listItem}>
              Homepage
            </li>
          </Link>
          <Image src="/img/coffeecup.png" alt="" width="30px" height="30px" />
          <Link href="/drinks" passHref>
            <li
              title="Order Drinks"
              target="_blank"
              className={styles.listItem}
            >
              Drinks
            </li>
          </Link>
          <Image src="/img/bean.png" alt="" width="30px" height="30px" />
          <Link href="/beans" passHref>
            <li
              title="Select Beans"
              target="_blank"
              className={styles.listItem}
            >
              Beans
            </li>
          </Link>
        </ul>
        <Link href="/cart" passHref>
          <div title="Shopping Cart" target="_blank" className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="50px" height="50px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>
      </div>
      <div className={styles.item}>
        <div title="Admin Login" target="_blank" className={styles.admin}>
          <Link href="/admin" passHref>
            <Image src="/img/admin.png" alt="" width="50px" height="50px" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
