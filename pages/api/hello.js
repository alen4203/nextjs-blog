// request: HTTP incoming request, response: HTTP server response
export default function handler(req, res) {
  res.status(200).json({ text: "hello" });
}
