import express from 'express'
import userController from '@/controller/userController'
import token from '@/middlewares/tokenUser'


const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/alluser', userController.getAllUsers);
router.get('/profile', userController.getUser);
router.post('/refresh-token', (req, res) => {
      const { refreshToken } = req.body;
      const newTokens = token.refreshAccessToken(refreshToken);
      if (newTokens) {
            return res.status(200).json(newTokens);
      } else {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
      }
});
module.exports = router