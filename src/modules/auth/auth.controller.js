const { loginUser } = require('./auth.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const tokens = await loginUser(email, password);

    return res.json({
      success: true,
      message: 'Login successful',
      data: tokens,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { login };