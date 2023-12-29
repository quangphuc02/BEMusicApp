const User = require('../models/User')
const bcrypt = require('bcrypt');
const { use } = require('../routes/auth');
const authController = {
      registerUser: async (req, res) => {
            try {
                  console.log("qq");
                  const salt = await (bcrypt).genSalt(10)
                  const hashed = await bcrypt.hash(req.body.password, salt)
                  //tạo user
                  const newUser = await new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hashed
                  })
                  console.log(15, newUser)
                  //lưu user vào db
                  const user = await newUser.save()
                  res.status(200).json(newUser)
            } catch (err) {
                  console.log(err);
                  res.status(500).json(err)
            }
      },
      loginUser: async (req, res) => {
            try {
                  const user = await User.findOne({ username: req.body.username })
                  if (!user) {
                        res.status(404).json("Sai tài khoản hoặc mật khẩu")
                  }
                  const validatePassword = await bcrypt.compare(
                        req.body.password,
                        user.password
                  )
                  if (!validatePassword) {
                        res.status(404).json("Sai tài khoản hoặc mật khẩu")
                  }
                  if (user && validatePassword) {
                        res.status.json(user)
                  }
            } catch (err) {
                  res.status(500).json(err)
            }
      }
}

module.exports = authController