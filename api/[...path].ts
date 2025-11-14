export default async function handler(req: any, res: any) {
  try {
    // Lấy path sau /api
    const urlPath = req.url?.replace(/^\/api/, "") || "";
    const url = `http://160.187.0.231:5000${urlPath}`;

    // Copy headers, loại bỏ host để backend không nhầm
    const headers: any = { ...req.headers };
    delete headers.host;

    // Xử lý body
    let body: any;
    if (!["GET", "HEAD"].includes(req.method)) {
      if (req.headers["content-type"]?.includes("application/json")) {
        body = JSON.stringify(req.body);
      } else {
        body = req.body;
      }
    }

    const response = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    // Trả về JSON nếu có
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    res.status(response.status).send(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
