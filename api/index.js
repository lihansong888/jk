let storage = {}; 

export default function handler(req, res) {
    const { id, password } = req.query;

    if (req.method === 'POST') {
        const { id, content, password: newPassword } = req.body;
        // 如果已存在且密码不对，禁止覆盖
        if (storage[id] && storage[id].password !== newPassword) {
            return res.status(403).send('密码错误');
        }
        storage[id] = { content, password: newPassword };
        return res.status(200).json({ success: true });
    }

    if (id && storage[id]) {
        // 读取时校验密码
        if (password && storage[id].password !== password) {
            return res.status(403).send('密码不正确');
        }
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.status(200).send(storage[id].content);
    }

    res.status(404).send('未找到内容');
}
