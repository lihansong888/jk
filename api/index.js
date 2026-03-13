// 极简后端逻辑
let storage = {}; // 临时存放在内存中

export default function handler(req, res) {
    const { id } = req.query;

    // 如果是 POST，就是存数据
    if (req.method === 'POST') {
        const { id, content } = req.body;
        storage[id] = content;
        return res.status(200).json({ success: true });
    }

    // 如果是 GET，就是取数据
    if (id && storage[id]) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.status(200).send(storage[id]);
    }

    res.status(404).send('未找到内容或已过期');
}
