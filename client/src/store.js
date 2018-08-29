import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email:'',
    password:'',
    statusLogin:false,
    name:'',
    title: '',
    question: '',
    allQuestion: '',
    detailQuestion: '',
    statusDetail: false
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
    },
    title(state,payload){
      state.title = payload
    },
    question(state,payload){
      state.question = payload
    },
    allQuestion(state,payload){
      state.allQuestion = payload
    },
    detailQuestion(state,payload){
      state.detailQuestion = payload
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
    Register({ commit, dispatch }, payload ){
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
    },
    CreateQuestion({ commit, dispatch }, payload ){
      var token = localStorage.getItem('token')
      axios.post('http://localhost:3000/questions/add',{
        title: this.state.title,
        question: this.state.question
      },{
        headers: { token: token }
      })
      .then( quest =>{
        swal('','success create new question!','success')
        this.state.title = ''
        this.state.question = ''
        dispatch('GetAll')
        // console.log(quest.data);
        
      })
      .catch( err =>{
        if(err.response.data.msg==="failed authentication"){
          swal('',"Your question couldn't be submitted. Please login before!","warning")
        }else{
          swal('',"Your question couldn't be submitted. Title and Question is required!","warning")
        }
        this.state.title = ''
        this.state.question = ''
        console.log(err.response.data);
      })
    },
    GetAll({ commit, dispatch }, payload ){
      axios.get('http://localhost:3000/questions')
      .then( quest =>{
        commit('allQuestion',quest.data)
        
      })
      .catch( err =>{
        console.log(err.response);
      })
    },
    Detail({ commit, dispatch }, payload ){
      this.state.statusDetail = true
      axios.get(`http://localhost:3000/questions/detail/${payload}`)
      .then( quest =>{
        commit('detailQuestion',quest.data)
      })
      .catch( err =>{
        console.log(err.response);
        
      })
    }
  }
})
