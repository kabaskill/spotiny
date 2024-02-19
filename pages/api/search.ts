// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from "next";
import { searchSpotify } from "@/lib/spotify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  try {
    const result = await searchSpotify(query as string);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error searching on Spotify:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
