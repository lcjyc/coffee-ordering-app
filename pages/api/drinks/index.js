import dbConnect from "../../../util/mongo";
import Drink from "../../../models/Drink";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const drinks = await Drink.find();
      res.status(201).json(drinks);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      const drink = await Drink.create(req.body);
      res.status(201).json(drink);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
