<template>
	<div class="modal fade bd-example-modal-lg" id="modal-createqu" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Add New Question</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
							<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="input-group mb-3">  
							Title : <input type="text" class="form" placeholder="" aria-label="" aria-describedby="basic-addon1" v-model="title">
					</div>
					<div align="left">
							Qustion: 
							<wysiwyg v-model="question" />
					</div>
				</div>
				<div class="modal-footer">
						<button type="button" class="btn btn-primary"  data-dismiss="modal" @click="CreateQuestion">Save</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
	name: 'newquestion',
	data(){
		return{
			// title: '',
			// question: ''
		}
	},
	computed: {

		title: {
				get(){
						return this.$store.state.title
				},
				set(value){
						return this.$store.commit('title',value)
				}
		},
		question: {
				get(){
						return this.$store.state.question
				},
				set(value){
						return this.$store.commit('question',value)
				}
		},
	},
	methods: {
		close(){
      this.$store.commit('title','')
			this.$store.commit('question','')
		},
		...mapActions([
			'CreateQuestion'
		])
	}
}
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css"
</style>
