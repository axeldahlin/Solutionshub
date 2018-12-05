import axios from 'axios'
// import { log } from 'util';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
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

  // Return null is not loggedIn
  // Otherwise, return an object representing the logged in user
  syncLoadUser() {
    return JSON.parse(localStorage.getItem('user'))
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

  getUserPulls(username) {
    return service
    .get('user/userpulls/'+ username)
    .then(res=>res.data)
    .catch(errHandler)
  },


  castVote(data) {
    return service
      .post('/pulls/vote', data)
      .then(res=>res.data)
      .catch(errHandler)
  },

  removeVote(data) {
    return service 
      .post('/pulls/unvote',data)
      .then(res=>res.data)
      .catch(errHandler)
  },

  checkVote(data) {
    return service
      .post('/pulls/getvote',data)
      .then(res=>res.data)
      .catch(errHandler)
  },

  checkVotes(data) {
    console.log("Check votes called API")
    return service
      .post('/pulls/getvotes',data)
      .then(res=>res.data)
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

  getPull(id) {
    return service
      .get('/pulls/pull-detail/'+id)
      .then(res => res.data)
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

  getRepoComments(id) {
    return service
      .get('/repo/repo-comment/'+ id)
      .then(res => res.data)
      .catch(errHandler)
  },

  fetchRepoInfo(repoName) {
    return service
      .get('repo/onerepo/'+repoName)
      .then(res=>res.data)
      .catch(errHandler)
  },



  postRepoComment(data){
    return service 
      .post('repo/repo-comment', data)
      .then(res => res.data)
      .catch(errHandler)

  },

  deleteRepoComment(id){
    return service 
    .delete('repo/repo-comment/'+id)
    .then(res => res.data)
    .catch(errHandler)
  },

  ///Routes above were in boiler plate, routes below are our own

  newLogout() {
    localStorage.removeItem('user')
    return service
      .post('/auth/logout')
      .then(res => {
        return res.data
      })
      .catch(err=>{
        console.log("err at newLogout()",err)
      })
  },

  isLoggedInNew() {
    return service 
      .get('/auth/isloggedin')
      .then(res => res.data)
      .catch(err=>{
        console.log("Error at isLoggedInNew",err)
      })
  },

  userData() {
    return service
      .get('/auth/loggedin')
      .then(res => {
        let user = res.data
        localStorage.setItem("user", JSON.stringify(user))
        return user
      })
      .catch(err=>{
        localStorage.removeItem("user")
      })
  },

  updateRepos() {
    return service 
      .get('/repo/repos')
      .then(res=>res.data)
      .catch(errHandler)
  },


  getPulls(repo,id) {
    console.log("METHOD:", '/repo/pulls/'+repo+'/'+id)
    return service
      .get('/repo/pulls/'+repo+'/'+id)
      .then(res =>res.data)
      .catch(errHandler)
  },


  updatePulls(repo) {
    return service
      .get('/repo/update-pulls/'+repo)
      .then(res => res)
      .catch(errHandler)
  },



}
