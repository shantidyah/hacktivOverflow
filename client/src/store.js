import Vue from 'vue'
import Vuex from 'vuex'
import { provider, auth } from '@/firebase.js'

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
    statusDetail: false,
    valueSearch: '',
    idQuest : '',
    answer: '',
    editAns:'',
    idAns:''
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
    },
    valueSearch(state,payload){
      state.valueSearch = payload
    },
    idQuest(state,payload){
      state.idQuest = payload
    },
    answer(state,payload){
      state.answer = payload
    },
    editAns(state,payload){
      state.editAns = payload
    },
    idAns(state,payload){
      state.idAns = payload
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
      commit('idQuest', payload)
      this.state.statusDetail = true
      axios.get(`http://localhost:3000/questions/detail/${payload}`)
      .then( quest =>{
        commit('detailQuestion',quest.data)
      })
      .catch( err =>{
        console.log(err.response);
        
      })
    },
    Search({ commit, dispatch }, payload ){
      axios.get(`http://localhost:3000/questions/search?q=${this.state.valueSearch}`)
      .then( questions =>{
        commit('allQuestion',questions.data)
        console.log(questions.data);
        
      })
      .catch( err =>{
        console.log(err.response);
        
      })
    },
    UpvoteQuest({ commit, dispatch }, payload ){
      const token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/questions/upvote/${payload}`,{},{
        headers: { token : token}
      })
      .then( upvote =>{
        console.log(upvote.data);
        dispatch( 'Detail', payload )
        
      })
      .catch( err =>{
        swal('',err.response.data.msg,'warning')
        console.log( err.response.data );
        
      })
    },
    DownvoteQuest({ commit, dispatch }, payload ){
      const token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/questions/downvote/${payload}`,{},{
        headers: { token : token}
      })
      .then( downvote =>{
        console.log(downvote.data);
        dispatch( 'Detail', payload )
        
      })
      .catch( err =>{
        swal('',err.response.data.msg,'warning')
        console.log( err.response.data );
      })
    },
    DeleteQuest({ commit, dispatch }, payload ){
      const token = localStorage.getItem('token')
      axios.delete(`http://localhost:3000/questions/delete/${payload}`,{
        headers: { token: token }
      })
      .then( deleteq =>{
        swal('','success delete this question','success')
        window.location = '/'
      })
      .catch( err =>{
        swal('',err.response.data.msg,'warning')

        console.log(err.response.data);
      })
    },
    UpdateQuest({ commit, dispatch }, payload ){
      const token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/questions/edit/${this.state.idQuest}`,{
          title: this.state.title,
          question: this.state.question
      },{
        headers: { token: token }
      })
      .then( quest =>{
        swal('','success update this question','success')
        this.state.title = ''
        this.state.question = ''
        dispatch( 'Detail', this.state.idQuest )
      })
      .catch( err =>{
        swal('',err.response.data.msg,'warning')
      })
    },
    ValueEditQuest({ commit, dispatch }, payload ){
      commit('title',payload.title)
      commit('question',payload.question)
      commit('idQuest',payload._id)
    },
    CreateAns({ commit, dispatch }, payload ){
      const token = localStorage.getItem('token')
      axios.post(`http://localhost:3000/answers/add/${this.state.idQuest}`,{
        answer: this.state.answer
      },{
        headers : {token : token}
      })
      .then( ans =>{
        swal('','success','success')
        this.state.answer = ''
        dispatch( 'Detail', this.state.idQuest )
      })
      .catch( err =>{
        console.log(err.response.data);
        
      })
    },
    UpvoteAns({ commit, dispatch }, payload ){
      const token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/answers/upvote/${payload}`,{},{
        headers: { token : token }
      })
      .then( upvote =>{
        console.log("berhasil",upvote.data);
        dispatch( 'Detail', this.state.idQuest )
        
      })
      .catch( err =>{
        swal('',err.response.data.msg,'warning')
        console.log( err.response.data );
        
      })
    },
    DownvoteAns({ commit, dispatch }, payload ){
      const token = localStorage.getItem('token')
      axios.put(`http://localhost:3000/answers/downvote/${payload}`,{},{
        headers: { token : token}
      })
      .then( downvote =>{
        console.log(downvote.data);
        dispatch( 'Detail', this.state.idQuest )
        
      })
      .catch( err =>{
        swal('',err.response.data.msg,'warning')
        console.log( err.response.data );
      })
    },
    ValueEditAns({ commit, dispatch }, payload ){
      commit('editAns',payload.answer)
      commit('idAns',payload._id)
    },
    UpdateAns({ commit, dispatch }, payload ){
      const token = localStorage.getItem('token')
      
      axios.put(`http://localhost:3000/answers/edit/${this.state.idAns}`,{
          answer: this.state.editAns
      },{
        headers: { token: token }
      })
      .then( ans =>{
        console.log("masuk berhasil");
        
        swal('','success update this answer','success')
        this.state.editAns = ''
        dispatch( 'Detail', this.state.idQuest )
      })
      .catch( err =>{
        swal('',err.response.data.msg,'warning')
      })
    },
    LoginFb(){
      auth.signInWithPopup(provider).then(result=>{
        const token = result.credential.accessToken
        axios.post(`http://localhost:3000/loginFb`,{
          fbToken : token
        })
        .then( response =>{
          swal('','success login!','success')
          .then(val =>{
            localStorage.setItem('token', response.data.token)
            this.state.statusLogin = true
          })
        })
        .catch( err =>{
          console.log(err.response.data);
          
          // swal('',err.response.data.msg,'warning')
          this.state.statusLogin = false
        })
      })
    }
  }
})
