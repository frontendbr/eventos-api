import axios from 'axios'
import jwt from 'jsonwebtoken'
import config from 'config'
import { success, error } from './../../constants'

export const auth = (request, response) => {
  const { code } = request.body

  let data = Object.assign({ code }, config.github)

  axios
    .post('https://github.com/login/oauth/access_token', data, params)
    .then(getUserInfo)
    .then(success(response))
    .catch(error(response))
}

const params = {
  headers: {
    'Content-Type': 'application/json', 'Accept': 'application/json'
  }
}

const generateJWT = ({ email }) => {
  return { token: jwt.sign({ email }, config.secret, { expiresIn: config.expiresIn }) }
}

const getUserInfo = ({ data }) => {
  console.log(data)
  return axios
    .get(`https://api.github.com/user?access_token=${data.access_token}`, params)
    .then((resp) => resp.data)
    .then(generateJWT)
}
