// Vercel Serverless 后端控制中心
let storage = {}; // 临时内存存储（Vercel 重启会重置）

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id, pwd } = req.query;

    // 场景 1: 保存数据 (POST)
    if (req.method === 'POST') {
        try {
            const { filename, content, password } = req.body;
            storage[filename] = { content, password };
            return res.status(200).json({ success: true });
        } catch (e) {
            return res.status(400).send("数据处理出错");
        }
    }

    // 场景 2: 获取数据 (GET)
    if (id) {
        const item = storage[id];
        if (!item) return res.status(404).send("未找到该接口");

        // 如果带了密码，说明是在前端点击“读取”
        if (pwd) {
            if (item.password === pwd) {
                return res.status(200).send(item.content);
            } else {
                return res.status(403).send("密码错误");
            }
        }

        // 如果没带密码，说明是播放器直接访问，直接吐内容
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.status(200).send(item.content);
    }

    res.status(400).send("无效请求");
}
