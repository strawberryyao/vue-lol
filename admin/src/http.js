import axios from 'axios'
// import Vue from 'vue'
// import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

export default http