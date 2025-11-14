import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Lấy path phía sau /api/Cannot find module '@vercel/node' or its corresponding type declarations.ts(2307)

    const path = req.url?.replace("/api/", "") || "";
    const url = `http://160.187.0.231:5000/api/${path}`;

    // Gửi request đến backend
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers as any,
      body: req.method !== "GET" ? req.body : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
