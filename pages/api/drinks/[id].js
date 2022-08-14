import dbConnect from "../../../util/mongo";
import Drink from "../../../models/Drink";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const drink = await Drink.findById(id);
      res.status(201).json(drink);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      const drink = await Drink.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(drink);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      await Drink.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
