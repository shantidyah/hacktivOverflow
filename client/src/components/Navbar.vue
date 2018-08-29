<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img class="card-img-top" src="../assets/logofox.jpg" alt="Card image cap" style="width:30px">
    <a class="navbar-brand" href="/" style="padding-right:10%;" @click="GetAll">Hacktiv-Overflow</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <div class="form-inline my-2 my-lg-0">
            <a class="nav-link disabled" href="#" data-toggle="modal" data-target="#modal-login" v-if='!statusLogin'>Login</a>
            <a class="nav-link disabled" href="#" data-toggle="modal" data-target="#modal-register" v-if='!statusLogin'>Register</a>
            <a class="nav-link disabled" href="#" @click="Logout" v-else>Logout</a>
        </div>
    </div>
    </nav>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    name:'navbar',
    computed:{
        ...mapState([
            'statusLogin'
        ])
    },
    methods: {
        ...mapActions([
            'Logout',
            'GetAll'
        ])
    },

}
</script>

<style>

</style>
