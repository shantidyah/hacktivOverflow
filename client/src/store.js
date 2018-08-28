import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email:'',
    password:'',
    statusLogin:false,
    name:''
  },
  mutations: {
    statusLogin(state,payload){
      state.statusLogin = payload
    },
    email(state,payload){
      state.email = payload
    },
    password(state,payload){
      state.password = payload
    },
    name(state,payload){
      state.name = payload
    }
  },
  actions: { // http://localhost:3000/
    Login({ commit, dispatch }, payload){
      axios.post('http://localhost:3000/login',{
        email: this.state.email,
        password: this.state.password
      })
      .then( user =>{
        swal('','success login!','success')
        localStorage.setItem('token', user.data)
        this.state.email = ''
        this.state.password = ''
        this.state.statusLogin = true
      })
      .catch( err =>{
        swal('',err.response.data.msg,'warning')
        this.state.email = ''
        this.state.password = ''
        this.state.statusLogin = false
      })
    },
    LocalStorage({ commit, dispatch }, payload){
      var token = localStorage.getItem('token')
      axios.get('http://localhost:3000/verify',{
        headers: { token: token}
      })
      .then( user =>{
        if(user){
          commit('statusLogin',true)
        }
        else{
          commit('statusLogin',false)
        }
      })
      .catch( err =>{
        commit('statusLogin',false)
      })
    },
    Logout({ commit, dispatch }, payload){
      localStorage.removeItem('token')
      swal('','success login!','success')
      this.state.statusLogin = false
    },
    Register({ commit, dispatch }, payload){
      axios.post('http://localhost:3000/register',{
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then( user =>{
        swal('','register success','success')
        console.log(user.data);
        localStorage.setItem('token', user.data)
        this.state.email = ''
        this.state.password = ''
        this.state.statusLogin = true
        
      })
      .catch( err =>{
        console.log(err.response.data);
        swal('','register failed','warning')
        this.state.name = ''
        this.state.email = ''
        this.state.password = ''
        this.state.statusLogin = false
      })
    }
  }
})
