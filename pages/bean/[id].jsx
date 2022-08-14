import styles from "../../styles/Bean.module.css";
import Image from "next/image";
import { axiosInstance } from "../../util/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Bean = ({ bean }) => {
  const [roast, setRoast] = useState(bean.roast[0]);
  const [price, setPrice] = useState(bean.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleRoast = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      setRoast(option);
    }
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = bean.prices[sizeIndex] - bean.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...bean, roast, price, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={bean.img} layout="fill" objectFit="contain" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{bean.title}</h1>
        <p className={styles.desc}>{bean.desc}</p>
        <h3 className={styles.choose}>Choose Roast Level</h3>
        <div className={styles.roast}>
          {bean.roast.map((option) => (
            <div className={styles.option} key={option}>
              <input
                type="radio"
                id={option}
                name="roast"
                value={option}
                className={styles.radio}
                onChange={(e) => handleRoast(e, option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/beans.png" layout="fill" alt="" />
            <span className={styles.number}>200g</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/beans.png" layout="fill" alt="" />
            <span className={styles.number}>400g</span>
          </div>
        </div>
        <h1 className={styles.price}>NT. {price}</h1>
        <div>
          <input
            type="number"
            defaultValue={1}
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axiosInstance.get(`/beans/${params.id}`);
  return {
    props: {
      bean: res.data,
    },
  };
};

export default Bean;
