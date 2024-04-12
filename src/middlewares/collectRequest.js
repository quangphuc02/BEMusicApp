import jwt from 'jsonwebtoken'

export const collectRequest = (req, res, next) => {
    req.c = {}
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    req.p = { ...req.body, ...req.params, ...req.query }

    if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.c.userId = decoded.data._id
    }
    next()
}




