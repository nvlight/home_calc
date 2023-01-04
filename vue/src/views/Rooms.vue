<template>
    <div class="min-h-full">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900"
                >Rooms</h1>
            </div>
        </header>

        <div class="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">

            <div>roomsLoading: {{ roomsLoading }}</div>

            <div v-if="roomsLoading" class="main_wrapper border-4 border-dashed border-gray-200 rounded-lg">
                <div class="text-center font-semibold">loading...</div>
            </div>

            <div class="main_wrapper border-4 border-dashed border-gray-200 rounded-lg">
                <div class="mt-2 flex justify-center">
                    <mg-button class="flex items-center" @click="$store.dispatch('room/createRoom')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>Добавить комнату
                    </mg-button>
                </div>

                <div class="flex flex-wrap justify-center mt-2">
                    <!-- Replace with your content -->
                    <room-list>
                    </room-list>
                    <!-- Replace with your content -->
                </div>
            </div>

            <rooms-jobs-materials-sum/>
        </div>

    </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import RoomList from "../components/room/RoomList.vue";
import RoomsJobsMaterialsSum from "../components/room/RoomsJobsMaterialsSum.vue";
import {mapState} from "vuex";

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
