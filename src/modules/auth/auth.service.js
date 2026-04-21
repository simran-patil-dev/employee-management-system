const prisma = require('../../shared/lib/prisma');
const { comparePassword } = require('../../shared/helpers/hashPassword');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../../shared/helpers/generateToken');

const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  if (user.status !== 'ACTIVE') {
    throw new Error('Account inactive');
  }

  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };
const accessToken = generateAccessToken(payload);

return { token: accessToken };
};

module.exports = { loginUser };