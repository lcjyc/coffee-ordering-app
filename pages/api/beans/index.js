import dbConnect from "../../../util/mongo";
import Bean from "../../../models/Bean";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const beans = await Bean.find();
      res.status(201).json(beans);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    if (!token || token !== process.env.token) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      const bean = await Bean.create(req.body);
      res.status(201).json(bean);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
