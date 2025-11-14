export default async function handler(req: any, res: any) {
  try {
    // Lấy path phía sau /api/
    const urlPath = req.url?.replace(/^\/api\//, "") || "";

    // Lấy query string
    const queryString = req.url?.split("?")[1] || "";

    const url = `http://160.187.0.231:5000/api/${urlPath}${
      queryString ? "?" + queryString : ""
    }`;

    // Forward request
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers as any,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body,
    });

    // Forward status + data
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
