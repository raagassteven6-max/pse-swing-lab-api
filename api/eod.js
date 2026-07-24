export default async function handler(req, res) {
    const { ticker, from, to } = req.query;
    const apiKey = process.env.EODHD_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ error: 'EODHD_API_KEY not configured' });
    }
    
    const url = `https://eodhd.com/api/eod/${ticker}?api_token=${apiKey}&from=${from}&to=${to}&period=d&fmt=json`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
