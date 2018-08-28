<template>
    <div class="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    email:
                    <input type="text" class="form-control" name="email" v-model="email">
                    password:
                    <input type="password" class="form-control" name="password" v-model="password">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="Login">Login</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'login',
    data(){
        return{

        }
    },
    computed: {
        email: {
            get(){
                return this.$store.state.email
            },
            set(value){
                return this.$store.commit('email',value)
            }
        },
        password: {
            get(){
                return this.$store.state.password
            },
            set(value){
                return this.$store.commit('password',value)
            }
        }
    },
    methods:{
        ...mapActions([
            'Login'
        ]),
        close(){
            this.$store.commit('email','')
            this.$store.commit('password','')
        }
    }
}
</script>

<style>

</style>
