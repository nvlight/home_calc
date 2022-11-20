<template>
    <div class="resultingSumm">
        <div class="">
            <div class="fixed border border-red-400 border-dotted rounded-full flex justify-center items-center"
                 style="top: 7px; right: 7px; height: 55px; width: 111px; margin-top: 0;
                 background-color: #fff; padding: 10px;
                ">
                <div class="fixed text-2xl font-semibold">{{ materialsSum + jobsSum }} {{ $store.state.currency }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: 'rooms-jobs-materials-sum',
    props: {

    },

    data(){
        return {
        }
    },

    methods: {
        ...mapActions({
        }),
    },
    computed: {
        ...mapState({
        }),

        ...mapGetters({
            jobsSum: 'roomJob/sum',
            materialsSum: 'roomMaterial/sum',
        }),
    },
    mounted() {
    },
    watch:{

    },
}
</script>

<style scoped>
</style>
