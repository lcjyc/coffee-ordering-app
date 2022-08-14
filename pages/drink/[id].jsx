import styles from "../../styles/Drink.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Drink = ({ coffee }) => {
  const [temp, setTemp] = useState(coffee.temp[0]);
  const [price, setPrice] = useState(coffee.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleTemp = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      setTemp(option);
    }
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = coffee.prices[sizeIndex] - coffee.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...coffee, temp, price, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={coffee.img} layout="fill" objectFit="contain" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{coffee.title}</h1>
        <p className={styles.desc}>{coffee.desc}</p>
        <h3 className={styles.choose}>Choose Hot/Iced</h3>
        <div className={styles.temperature}>
          {coffee.temp.map((option) => (
            <div className={styles.option} key={option}>
              <input
                type="radio"
                id={option}
                name="temperature"
                value={option}
                className={styles.radio}
                onChange={(e) => handleTemp(e, option)}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
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
  const res = await axios.get(`http://localhost:3000/api/drinks/${params.id}`);
  return {
    props: {
      coffee: res.data,
    },
  };
};

export default Drink;
