const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10;

const hashPassword = async (plaintext) => {
  return await bcrypt.hash(plaintext, SALT_ROUNDS)
}

const checkPassword = async (plaintext, hash) => {
  return await bcrypt.compare(plaintext, hash)
}

module.exports = {
  hashPassword, checkPassword
}