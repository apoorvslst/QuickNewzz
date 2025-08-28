export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=YOUR_API_KEY&page=1&pageSize=20`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
