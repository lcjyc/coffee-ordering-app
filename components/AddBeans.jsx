import styles from "../styles/AddBeans.module.css";
import { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../util/config";

const AddBeans = ({ setAddBeans }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [roast, setRoast] = useState([]);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleRoast = (e, index) => {
    const currentRoast = roast;
    currentRoast[index] = e.target.value;
    setRoast(currentRoast);
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
        roast,
        img: url,
      };
      await axiosInstance.post("/beans", newProduct);
      alert("New Product has been created!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setAddBeans(false)}>
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
              placeholder="200g"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputM}`}
              type="number"
              placeholder="400g"
              onChange={(e) => changePrice(e, 1)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Roast Level</label>
          <div className={styles.roastContainer}>
            <input
              type="checkbox"
              id="Light"
              value="Light"
              onChange={(e) => handleRoast(e, 0)}
            />
            <label htmlFor="Light Roast">Light Roast</label>
            <input
              type="checkbox"
              id="Medium"
              value="Medium"
              onChange={(e) => handleRoast(e, 1)}
            />
            <label htmlFor="Medium">Medium Roast</label>
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddBeans;
