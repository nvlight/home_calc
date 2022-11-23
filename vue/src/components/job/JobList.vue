<template>
    <div>
        <div class="font-semibold">
            currentPickedJob: {{ currentPickedJob }}
        </div>
        <div class="font-semibold">
            selectedComponentTitle: {{ selectedComponentTitle }}
        </div>

<!--        <div class="font-semibold">-->
<!--            selectedComponent: {{ selectedComponent }}-->
<!--        </div>-->

<!--        <div>-->
<!--            job list:-->
<!--            <div v-for="job in JobComponents">-->
<!--                {{ job.name }}-->
<!--            </div>-->
<!--        </div>-->
        <component
            :is="selectedComponentName"
            :room="room"
        ></component>
    </div>
</template>

<script>
import JobComponents from "../job"

export default {
    name: 'job-list',
    props: {
        currentPickedJob: {
            type: Number,
            required: true,
        },
        room: {
            type: Object,
            required: true,
        }
    },
    data(){
        return {
            JobComponents: [],
        }
    },
    methods:{

    },
    computed:{
        selectedComponent(){
            return this.JobComponents[this.currentPickedJob];
        },
        selectedComponentName(){
            return this.JobComponents[this.currentPickedJob]?.name;
        },
        selectedComponentTitle(){
            return this.JobComponents[this.currentPickedJob]?.data().title;
        },
    },

    mounted() {
        this.JobComponents = JobComponents;
    }
}
</script>

<style scoped>

</style>
