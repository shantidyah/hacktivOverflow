<template>
	<div class="container">
		<div class="card" v-for="(question, index) in allQuestion" :key=index>
			<div class="card-body row">
				<div class="col-md-1 col-sm-3">
						<div>{{question.vote}}</div>
						<div>votes</div>

				</div>
				<div class="col-md-1 col-sm-2">
						<div>{{question.answers.length}}</div>
						<div>answers</div>
				</div>
				<div class="col-md-10 col-sm-10">
					  <router-link :to="{name: 'detail', params: {id: question._id}}" class="mt-0 mb-1" style="color:black; text-decoration: none" @click.native="Detail(question._id)">{{question.title}}</router-link>

						<!-- <div style="cursor:pointer">{{question.title}}</div> -->
						<div><p align="right" style="font-size:80%">asked {{question.createdAt | changeDate}} by {{question.user.name}}</p></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
	name: 'list',
	computed: {
		...mapState([
			'allQuestion'
		])
	},
	filters:{
		changeDate:function(val){
				var bulan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
				var newDate = new Date(val)
				var date = newDate.getDate().toString()
				var month = newDate.getMonth()
				var year = newDate.getFullYear().toString()
				if(month.length == 1){
						month = '0'+ month
				}else if(date.length == 1){
						date = '0'+date 
				}
				return date + ' ' + bulan[month] + ' ' + year
		}
	},
	methods: {
		...mapActions([
			'Detail'
		])
	}
}
</script>

<style>

</style>
