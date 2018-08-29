<template>
  <div class="home">
    <navbar></navbar>
    <div v-if='!statusDetail'>
      <search></search>
      <Content style="padding-top:5%"></Content>
    </div>
    <div v-else>
      <Detail></Detail>
    </div>
    <Login></Login>
    <Register></Register>
    <create-q></create-q>
    <EditQ></EditQ>
    <EditA></EditA>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Search from '@/components/Search.vue'
import Content from '@/components/Content.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import CreateQ from '@/components/CreateQ.vue'
import Detail from '@/components/Detail.vue'
import Footer from '@/components/Footer.vue'
import EditQ from '@/components/EditQ.vue'
import EditA from '@/components/EditA.vue'


import {mapState, mapActions} from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Navbar,
    Search,
    Content,
    Login,
    Register,
    CreateQ,
    Detail,
    Footer,
    EditQ,
    EditA
  },
  computed:{
    ...mapState([
      'statusDetail',
      'statusLogin'
    ])
  },
  watch:{
    statusLogin(val){
      this.statusLogin = val
    }
  },
  created(){
    this.LocalStorage()
    this.GetAll()
  },
  methods:{
    ...mapActions([
      'LocalStorage',
      'GetAll',
    ])
  }
}
</script>
