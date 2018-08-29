<template>
    <div>
        <div class="row">
            <div class="form-inline col-md-4 offset-md-8" style="padding-top:3%;">
                <input class="form-control mr-sm-2" type="search" v-model='valueSearch' placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click='Search'>Search</button>
            </div>
        </div>
            <div class="col align-self-center" style="font-size:200%">Top Question</div>
            <div><a href='#' data-toggle="modal" data-target="#modal-createqu">Create Question</a></div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name:'search',
    computed: {
		valueSearch: {
			get(){
				return this.$store.state.valueSearch
			},
			set(value){
				return this.$store.commit('valueSearch',value)
			}
        },
    },
    methods: {
        ...mapActions([
            'Search'
        ])
    }
}
</script>

<style>

</style>
