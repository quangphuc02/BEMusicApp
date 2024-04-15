import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { get } from 'mongoose'

export const collectRequest = asyncHandler(async (req, res, next) => {
    req.c = {}
    req.c.MESS = {
        get: "Lấy dữ liệu thành công",
        add: "Thêm dữ liệu thành công",
        delete: "Xóa dữ liệu thành công",
        update: "Chỉnh sửa dữ liệu thành công",
        errList: "Không tìm thấy dữ liệu!",
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    req.p = { ...req.body, ...req.params, ...req.query }

    if (token) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.c.userId = decoded.data._id
    }
    next()
})




