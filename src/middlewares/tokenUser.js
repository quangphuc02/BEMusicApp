const jwt = require('jsonwebtoken');


exports.generateTokens = (user) => {
      const accessToken = jwt.sign({ data: user }, process.env.SECRET_KEY, { expiresIn: '30d' });
      const refreshToken = jwt.sign({ data: user }, process.env.KEYREFRESHJWT, { expiresIn: '365d' });
      return { accessToken, refreshToken };
};

exports.verifyToken = (token, isRefreshToken = false) => {
      try {
            return jwt.verify(token, isRefreshToken ? process.env.KEYREFRESHJWT : process.env.SECRET_KEY);
      } catch (err) {
            return null;
      }
};
exports.refreshAccessToken = (refreshToken) => {
      const data = exports.verifyToken(refreshToken, true);
      if (data) {
            return exports.generateTokens(data);
      }
      return null;
};
