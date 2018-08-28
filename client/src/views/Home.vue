<template>
  <div class="home">
    <navbar></navbar>
    <search></search>
    <Content style="padding-top:5%"></Content>
    <Login></Login>
    <Register></Register>
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

import {mapState, mapActions} from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Navbar,
    Search,
    Content,
    Login,
    Register
  },
  created(){
    this.LocalStorage()
  },
  methods:{
    ...mapActions([
      'LocalStorage'
    ])
  }
}
</script>
