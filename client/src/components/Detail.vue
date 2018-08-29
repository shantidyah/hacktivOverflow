<template>
    <div class="container" style="margin-top:5%; width: 60rem;">
        <div>
            <div class="question">
                <div align="left" style="font-size:200%;">{{detailQuestion.title}}</div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-md-2 col-sm-2">
                            <i class="fas fa-caret-up fa-4x row" style="margin-left:35%; cursor:pointer" @click="UpvoteQuest(detailQuestion._id)"></i>
                            {{detailQuestion.vote}}
                            <i class="fas fa-caret-down fa-4x row" style="margin-left:35%; cursor:pointer" @click="DownvoteQuest(detailQuestion._id)"></i>
                        </div>
                        <div class="col-md-10 col-sm-10">
                            <div><p align="right" style="font-size:80%">asked {{detailQuestion.createdAt | changeDate}} by {{detailQuestion.user.name}}</p></div>
                            <div><p align="right" style="font-size:80%; color:blue"><a style="cursor:pointer" data-toggle="modal" data-target="#modal-editq" @click="ValueEditQuest(detailQuestion)">edit</a> | <a style="cursor:pointer" @click="DeleteQuest(detailQuestion._id)">delete</a></p></div>

                            <div v-html="detailQuestion.question"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="answer" style="margin-top:5%">
                <div align="left" style="font-size:150%;">{{detailQuestion.answers.length}} Answers</div>
                <div class="card" v-for="(answer,index) in detailQuestion.answers" :key=index>
                    <div class="card-body row">
                        <div class="col-md-2 col-sm-2">
                            <i class="fas fa-caret-up fa-4x row" style="margin-left:35%; cursor:pointer" @click="UpvoteAns(answer._id)"></i>
                            {{answer.vote}}
                            <i class="fas fa-caret-down fa-4x row" style="margin-left:35%; cursor:pointer" @click="DownvoteAns(answer._id)"></i>
                        </div>
                        <div class="col-md-10 col-sm-10">
                            <div><p align="right" style="font-size:80%">answered {{answer.createdAt | changeDate}} by {{answer.user.name}}</p></div>
                            <div><p align="right" style="font-size:80%; color:blue"><a style="cursor:pointer" data-toggle="modal" data-target="#modal-edita" @click="ValueEditAns(answer)">edit</a></p></div>
                            <div v-html="answer.answer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top:5%">
            <div align="left" style="font-size:100%;">Your Answer</div>
				<wysiwyg v-model="answer" />
			    <button type="button" class="btn btn-primary"  data-dismiss="modal" @click="CreateAns">Submit</button>
        </div>

    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data(){
        return{
            question:'',
        }
    },
    computed: {
        ...mapState([
            'detailQuestion'
        ]),
        answer: {
            get(){
                return this.$store.state.answer
            },
            set(value){
                return this.$store.commit('answer',value)
            }
		},
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
    methods:{
        ...mapActions([
            'UpvoteQuest',
            'DownvoteQuest',
            'DeleteQuest',
            'ValueEditQuest',
            'CreateAns',
            'UpvoteAns',
            'DownvoteAns',
            'ValueEditAns'
        ])
    }
}
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css"
</style>
