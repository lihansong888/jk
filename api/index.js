// Vercel Serverless Function
let cache = {}; // 临时内存存储

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.query;

    if (req.method === 'POST') {
        const { filename, content } = JSON.parse(req.body);
        cache[filename] = content;
        return res.status(200).json({ success: true });
    }

    if (id) {
        const data = cache[id];
        return data ? res.status(200).send(data) : res.status(404).send("未找到接口");
    }

    res.status(400).send("无效请求");
}
