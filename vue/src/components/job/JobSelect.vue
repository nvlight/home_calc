<template>
    <component
        :is="selectedComponentName"
        :room="room"
    ></component>
</template>

<script>
import JobComponents from "../job"

export default {
    name: 'job-select',
    props: {
        selectedJob: {
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
        selectedComponentName(){
            return this.JobComponents[this.selectedJob]?.name;
        },
    },

    mounted() {
        this.JobComponents = JobComponents;
    }
}
</script>

<style scoped>

</style>
