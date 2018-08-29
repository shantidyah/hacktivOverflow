<template>
	<div class="modal fade" id="modal-editq" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Edit Question</h5>
					<button type="button" class="close" data-dismiss="modal"  aria-label="Close">
							<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					title:
					<input type="text" class="form-control" name="title" v-model="title">
					question:
					<wysiwyg v-model="question" />					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" data-dismiss="modal" @click="UpdateQuest">Submit</button>
					<button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
	name: 'editq',
	computed:{
		...mapState([
			'title',
			'question'
		]),
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
		}
	},
	methods:{
		...mapActions([
				'UpdateQuest'
		]),
		// close(){
		// 		this.$store.commit('title','')
		// 		this.$store.commit('question','')
		// }
	}
}
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css"
</style>
