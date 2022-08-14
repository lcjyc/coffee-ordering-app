import styles from "../styles/AddDrinks.module.css";
import { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../util/config";

const AddDrinks = ({ setAddDrinks }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [temp, setTemp] = useState([]);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleTemp = (e, index) => {
    const currentTemp = temp;
    currentTemp[index] = e.target.value;
    setTemp(currentTemp);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/sourjyc/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        temp,
        img: url,
      };
      await axiosInstance.post("/drinks", newProduct);
      alert("New Product has been created!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setAddDrinks(false)}>
          X
        </span>
        <h1>Add new product</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputM}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputM}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 1)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Hot/Iced</label>
          <div className={styles.tempContainer}>
            <input
              type="checkbox"
              id="Hot"
              value="Hot"
              onChange={(e) => handleTemp(e, 0)}
            />
            <label HtmlFor="Hot">Hot</label>
            <input
              type="checkbox"
              id="Iced"
              value="Iced"
              onChange={(e) => handleTemp(e, 1)}
            />
            <label htmlFor="Iced">Iced</label>
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddDrinks;
