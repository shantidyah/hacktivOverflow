<template>
	<div class="modal fade" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Register</h5>
					<button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					name:
					<input type="text" class="form-control" name="name" v-model="name" v-if='!statusName' style="border-color:red">
					<input type="text" class="form-control" name="name" v-model="name" v-else>
					email:
					<input type="text" class="form-control" name="email" v-model="email" v-if='!statusEmail' style="border-color:red">
					<input type="text" class="form-control" name="email" v-model="email" v-else>
					password:
					<input type="password" class="form-control" name="password" v-model="password" v-if='!statusPasword' style="border-color:red">
					<input type="password" class="form-control" name="password" v-model="password" v-else>
					<br>
					<p align="left" style="color:red">{{statusErr}}</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary"  data-dismiss="modal" @click="register" >Save</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import { required, minLength, email } from 'vuelidate/lib/validators'
import {mapState, mapActions} from 'vuex'

export default {
	name:'register',
	data(){
		return{
			statusName : true,
			statusErr : '',
			statusEmail : true,
			statusPasword : true
		}
	},
	watch:{
		name: function(val){
			if(val.length<1){
				this.statusName = false
				this.statusErr = 'name cannot empty'
			}
			else{
				this.statusName = true
				this.statusErr = ''
			}
		},
		email: function(val){
			var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
			var email = re.test(val)
			if(email && val.length>1){
					this.statusEmail = true
					this.statusErr = ''
			}
			else{
					this.statusErr = `${val} is not a valid email!`
					this.statusEmail = false
			}
		},
		password: function(val){
			if(val.length<6){
					this.statusPasword = false
					this.statusErr = 'password must have min 6 character'
			}
			else{
					this.statusPasword = true
					this.statusErr = ''
			}
		}
	},
	computed: {
		name: {
			get(){
					return this.$store.state.name
			},
			set(value){
					return this.$store.commit('name',value)
			}
		},
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
		close(){
			this.name = ''
			this.email=''
			this.password=''
			this.statusName = true
			this.statusErr = ''
			this.statusEmail = true
			this.statusPasword = true
		},
		...mapActions([
			'Register'
		]),
		register(){
			
			this.Register()
			this.statusName = true
			this.statusEmail = true
			this.statusPasword = true
			this.statusErr = ''
		}
	}

}
</script>

<style>

</style>
