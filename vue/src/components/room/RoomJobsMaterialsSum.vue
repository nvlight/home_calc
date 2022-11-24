<template>
    <div v-if="sum" class="mt-3 mb-3 text-xl text-center">
        <span>Сумма материалов и работ: </span>
        <span class="font-semibold ">{{ sum }}&nbsp;{{ currency }}</span>

<!--        <div>likes: {{likes}}</div>-->
<!--        <mg-button @click="doubleLike">double like</mg-button>-->
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {ref} from "vue";

export default {
    name: 'room-jobs-materials-sum',
    components: {},

    props: {
    },
    inject: ['room_id'],
    data(){
        return {
            roomJobsSum: 0,
            roomMaterialsSum: 0,
        }
    },

    methods: {
        ...mapActions({
        }),

    },
    computed: {
        ...mapState({
            currency: state => state.currency,
        }),
        ...mapGetters({
            jobsSum: 'roomJob/sumByRoomId',
            materialsSum: 'roomMaterial/sumByRoomId',
        }),

        sum(){
            return this.jobsSum(this.room_id) + this.materialsSum(this.room_id);
        }
    },
    mounted() {
    },
    watch:{
    },

    // setup(props){
    //     const likes = ref(333);
    //
    //     const doubleLike = () => {
    //         likes.value *= 2;
    //     }
    //
    //     return {
    //         likes,
    //         doubleLike,
    //     }
    // }
}
</script>

<style scoped>

</style>
