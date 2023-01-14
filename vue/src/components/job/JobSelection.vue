<template>
    <!-- Шаг 2. Выбор и добавление работ -->
    <div class="min-h-full flex items-center justify-start p-2 sm:px-2 lg:px-2">
        <div class="max-w-md w-full space-y-2">
            <h1 class="font-light text-xl text-center">Шаг 2. Выбор и добавление работ</h1>

            <label>
<!--                v-if="jobSelectList?.length"-->
                <span class="block text-sm font-medium text-gray-700">Наименование работы</span>
                <select v-model="selectedJob"
                    @change="setRoomSelectedJobId(selectedRoomJobIds)"

                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm mb-3"
                >
                    <option :value="-1" selected>Выберите вид работы</option>
                    <option v-for="(job,index) in jobSelectList"
                        :key="index"
                        :value="index"
                        class="text-1xl"
                    >{{index+1}}. {{job.data().title}}<span class="font-semibold"></span></option>
                </select>
            </label>

            <job-choose :selectedJob="selectedJob" :room="room"/>
        </div>
    </div>
</template>

<script>
import JobChoose from "./JobChoose.vue";
import {mapActions, mapState} from "vuex";
import JobList from "../job"

export default {
    name: 'job-selection',
    components: {
        JobChoose,
    },
    props:{
        room: {
            type: Object,
            required: true,
        }
    },
    data(){
        return {
            selectedJob: 0,
            jobSelectList: [],
        }
    },
    methods: {
        ...mapActions({
            setRoomSelectedJobId: 'room/setRoomSelectedJobId',
        }),
    },
    computed:{
        ...mapState({
        }),

        selectedRoomJobIds(){
            return {
                roomId: this.room.id,
                jobId: this.selectedJob,
            }
        },
    },
    mounted(){
        this.jobSelectList = JobList;

        if (sessionStorage.getItem('selectedJobsArray')){
            let pr = JSON.parse(sessionStorage.getItem('selectedJobsArray'));
            const ser = pr.filter(t => t.roomId === this.room.id);
            this.selectedJob = ser.length ? ser[0].jobId : 0;
            // todo: возможно не стоит доверь данным из session, поставить проверку на set
            this.$store.commit('room/setRoomSelectedJobsArray', pr);
        }
    },
}
</script>

<style scoped>

</style>
