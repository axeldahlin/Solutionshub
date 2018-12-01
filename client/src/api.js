import axios from 'axios'
import { log } from 'util';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5001/api',
  withCredentials: true
})

const authService = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000',
  withCredentials: true
})



const errHandler = err => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error("API response", err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        res.data
      })
      .catch(errHandler)
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
        password,
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  loginGithub(){
    console.log("login Github called")
    return authService
      .get('auth/github')
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service
      .get('/logout')
  },

  getCountries() {
    return service
      .get('/countries')
      .then(res => res.data)
      .catch(errHandler)
  },

  postCountries(data) {
    return service
      .post('/countries', data)
      .then(res => res.data)
      .catch(errHandler)
  },

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler)
  },

  getRepos() {
    return service
      .get('/repo')
      .then(res => res.data)
      .catch(errHandler)
  },

  getPulls(repo) {
    console.log('getPulls called')
    return service
      .get('/repo/pulls/'+repo)
      .then(res => {
        console.log('test')
        return res.data
      
      })
      .catch(errHandler)
  },


  updatePulls(repo) {
    console.log('update pulls called')
    return service
      .get('/repo/update-pulls/'+repo)
      .then(res => res)
      .catch(errHandler)
  },



  addPicture(file) {
    const formData = new FormData()
    formData.append("picture", file)
    return service
      .post('/endpoint/to/add/a/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler)
  },
}
