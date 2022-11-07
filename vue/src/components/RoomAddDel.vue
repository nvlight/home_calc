<template>
    <div class="mt-2 pl-3 flex items-center">
<!--        <div>roomLastId: {{Number($store.state.room.lastId)}}</div>-->
        <button class="flex items-center ml-3 p-3
            border border-transparent
            text-sm font-medium rounded-md text-white bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="insertEmptyRoom"
        ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>Добавить комнату</button>
    </div>
</template>

<script>
export default {
    name: 'room-add-del',

    data(){
        return {

        }
    },

    methods: {
        insertEmptyRoom(){
            this.$store.dispatch('room/insertEmptyRoom')
        },
    },
    computed: {

    },
}
</script>

<style scoped>

</style>
