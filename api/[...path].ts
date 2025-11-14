export default async function handler(req: any, res: any) {
  try {
    // Xử lý path: lấy phần sau /api
    let urlPath = req.url?.replace(/^\/api/, "") || ""; // loại bỏ /api
    const url = `http://160.187.0.231:5000${urlPath}`; // không thêm /api nữa

    const response = await fetch(url, {
      method: req.method,
      headers: req.headers as any,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
