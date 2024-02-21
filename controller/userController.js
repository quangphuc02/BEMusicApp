const users = require("../db/models/userSchema")
// const userVerification = require("../models/userVerification")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { google } = require("googleapis")
const tokenUser = require('../middlewares/tokenUser');


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
const sendMail = async (userEmail) => {
      try {
            const accessToken = await oAuth2Client.getAccessToken()
            const transport = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                        type: 'OAuth2',
                        user: process.env.AUTH_EMAIL,
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken,
                  }
            })
            const info = await transport.sendMail({
                  from: `"vietthanhca.vn † " <${process.env.AUTH_EMAIL}>`, // sender address
                  to: userEmail,  // list of receivers
                  subject: "Chào mừng bạn đến với cộng đồng Thánh Ca Việt", // Subject line
                  text: "Chào mừng bạn đến với VietThanhCa. ", // plain text body
                  html: "<b> <br></b>Chúng tôi rất vui khi bạn đã gia nhập cộng đồng của chúng tôi.<br></br> VietThanhCa là một trang web được xây dựng với tình yêu và niềm tin, dành cho tất cả những ai muốn tìm hiểu và chia sẻ về âm nhạc và lời Chúa trong bối cảnh Công giáo. <br></br> Tại đây, bạn sẽ tìm thấy một kho tàng phong phú của các bài hát, bản nhạc, và tài liệu giáo dục khác. Chúng tôi hy vọng rằng những tài nguyên này sẽ giúp bạn tìm thấy niềm vui, sự an ủi, và sự truyền cảm hứng trong hành trình tôn giáo của mình. <br></br> Nếu bạn có bất kỳ câu hỏi hoặc cần sự hỗ trợ, đừng ngần ngại liên hệ với chúng tôi. Chúng tôi luôn sẵn lòng giúp đỡ!<br></br>Chúc bạn một hành trình tuyệt vời cùng VietThanhCa!<br></br>Trân trọng,<br></br>VIETTHANHCAVN </b>", // html body
            });
            console.log(info);
      } catch (err) {
            console.log(err);
      }
}

const userController = {
      signup: async (req, res, next) => {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            try {
                  const existingUser = await users.findOne({ username: req.body.username });
                  const existingEmail = await users.findOne({ email: req.body.email })
                  if (existingUser) return res.status(400).json({ message: 'Tên người dùng đã tồn tại', status: false });
                  if (existingEmail) return res.status(400).json({ message: 'Email đã tồn tại', status: false });
                  const newUser = new users({
                        username: req.body.username,
                        password: hashed,
                        email: req.body.email,
                  });
                  const data = await newUser.save();

                  await sendMail(req.body.email);
                  res.status(200).json({ data: data, message: 'Tạo mới người dùng thành công', status: true });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      },
      login: async (req, res, next) => {
            try {
                  const data = await users.findOne({ username: req.body.username });
                  if (!data) {
                        return res.status(400).json({ message: 'Tên người dùng không tồn tại', status: false });
                  }
                  const validPassword = await bcrypt.compare(req.body.password, data.password);
                  if (!validPassword) {
                        return res.status(400).json({ message: 'Mật khẩu không đúng', status: false });
                  }
                  const { accessToken, refreshToken } = tokenUser.generateTokens(data);
                  let { password, email, __v, _id, ...datas } = data.toObject();
                  return res.status(200).json({ status: true, data: data, message: "Đăng nhập thành công", accessToken });
            } catch (error) {
                  return res.status(500).json({ error: error.message });
            }
      },

      deleteUser: async (req, res, next) => {
            try {
                  const authHeader = req.headers['authorization'];
                  const token = authHeader && authHeader.split(' ')[1];
                  if (!token) {
                        return res.status(401).json({ message: 'Chưa đăng nhập' });
                  }
                  const userFromToken = tokenUser.verifyToken(token);
                  if (!userFromToken || !userFromToken.data) {
                        return res.status(401).json({ message: 'Invalid token' });
                  }
                  if (userFromToken.data.admin === false) {
                        return res.status(403).json({ message: 'Bạn không có quyền xóa người dùng' });
                  }
                  const user = await users.findByIdAndDelete(req.params.id);
                  if (!user) {
                        return res.status(400).json({ message: 'User not found' });
                  }
                  return res.status(200).json({ message: 'Xóa người dùng thành công' });
            } catch (error) {
                  return res.status(500).json({ error: error.message });
            }
      },
      getUser: async (req, res, next) => {
            try {
                  const authHeader = req.headers['authorization'];
                  const token = authHeader && authHeader.split(' ')[1];
                  if (!token) {
                        return res.status(401).json({ message: 'Chưa đăng nhập' });
                  }
                  const userFromToken = tokenUser.verifyToken(token);
                  if (!userFromToken || !userFromToken.data) {
                        return res.status(401).json({ message: 'Invalid token' });
                  }
                  const user = await users.findById(userFromToken.data._id);
                  if (!user) {
                        return res.status(400).json({ message: 'User not found' });
                  }
                  let { password, email, __v, _id, ...datas } = user.toObject();
                  return res.status(200).json({ status: true, data: datas, message: "Lấy thông tin người dùng thành công" });
            } catch (error) {
                  return res.status(500).json({ error: error.message });
            }
      },

      updateUser: async (req, res, next) => {
            try {
                  const data = await users.findByIdAndUpdate(req.params.id, req.body, { new: true });
                  if (!data) {
                        return res.status(400).json({ message: 'Không tìm thấy user' });
                  }
                  return res.status(200).json({ message: 'Cập nhật thành công', data });
            } catch (error) {
                  return res.status(500).json({ error: error.message });
            }
      },
      getAllUsers: async (req, res, next) => {
            try {
                  const allUsers = await users.find();
                  res.status(200).json({ data: allUsers, message: 'Lấy tất cả người dùng thành công', status: true });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      },
}
module.exports = userController
