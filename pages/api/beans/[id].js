import dbConnect from "../../../util/mongo";
import Bean from "../../../models/Bean";

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
      const bean = await Bean.findById(id);
      res.status(201).json(bean);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      await Bean.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
