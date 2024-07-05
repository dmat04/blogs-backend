const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10;

const hashPassword = async (plaintext) => {
  return bcrypt.hash(plaintext, SALT_ROUNDS)
}

const checkPassword = async (plaintext, hash) => {
  try {
    return await bcrypt.compare(plaintext, hash)
  } catch (error) {
    return false;
  }
}

module.exports = {
  hashPassword, checkPassword
}