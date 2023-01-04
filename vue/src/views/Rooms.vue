<template>
    <div class="min-h-full">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900"
                >Rooms</h1>
            </div>
        </header>
        <main class="relative">

            <div class="mt-2 flex justify-center">
                <mg-button class="flex items-center" @click="$store.dispatch('room/createRoom')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>Добавить комнату
                </mg-button>
            </div>

            <div class="main_wrapper">
                <div class="flex flex-wrap justify-around">
                    <!-- Replace with your content -->
                    <room-list>
                    </room-list>
                    <!-- Replace with your content -->
                </div>
            </div>

            <rooms-jobs-materials-sum></rooms-jobs-materials-sum>
        </main>

    </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'
import RoomList from "../components/room/RoomList.vue";
import store from "../store/index.js";
import router from "../router/index.js";
import RoomsJobsMaterialsSum from "../components/room/RoomsJobsMaterialsSum.vue";



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
         logout(){
            store.dispatch('logout')
                .then( () => {
                    router.push({
                        name: 'Login',
                    })
                });
        },
    },
    computed:{
    },
    mounted() {
    },
}

</script>
