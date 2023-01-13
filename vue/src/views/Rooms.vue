<template>
    <div class="min-h-full">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900"
                >Rooms</h1>
            </div>
        </header>

        <div class="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">

<!--            <div>roomsLoading: {{ roomsLoading }}</div>-->

            <div class="main_wrapper border-4 border-dashed border-gray-200 rounded-lg">

                <div v-if="roomsLoading" class="">
                    <div class="text-center font-semibold">loading...</div>
                </div>

                <div class="mt-2 flex justify-center items-center px-1 w-full flex-wrap">
                    <mg-plus-button class="mt-1" @click="createRoom">Добавить комнату</mg-plus-button>
                    <rooms-jobs-materials-sum class="ml-2 mt-1"/>
                </div>

                <div class="flex flex-wrap justify-center mt-2">
                    <!-- Replace with your content -->
                    <room-list>
                    </room-list>
                    <!-- Replace with your content -->
                </div>
            </div>


        </div>

    </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import RoomList from "../components/room/RoomList.vue";
import RoomsJobsMaterialsSum from "../components/room/RoomsJobsMaterialsSum.vue";
import {mapActions, mapState} from "vuex";

export default {
    name: 'rooms',
    components: {
        Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems,
        BellIcon, MenuIcon, XIcon,
        RoomList, RoomsJobsMaterialsSum,
    },
    data(){
        return {
        }
    },
    methods:{
        ...mapActions({
            'createRoom': "room/createRoom",
        }),
    },
    computed:{
        ...mapState({
            'roomsLoading' : state => state.room.loading,
        }),
    },
    mounted() {
    },
}

</script>
