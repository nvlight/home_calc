<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <main-link class="flex-shrink-0"></main-link>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <navbar></navbar>

                            <div :class="['text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium cursor-pointer']"
                                 @click="showMaterialsDialog"
                            >Материалы</div>

                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6">
                        <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <!-- Profile dropdown -->
                        <Menu as="div" class="ml-3 relative">
                            <div>
                                <MenuButton class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                        <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                                    </MenuItem>
                                    <MenuItem
                                        v-slot="{ active }">
                                        <a @click="logout"
                                           :class="[active ? 'bg-gray-100' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700']"> Sign out
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
                <div class="-mr-2 flex md:hidden">
                    <!-- Mobile menu button -->
                    <DisclosureButton class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span class="sr-only">Open main menu</span>
                        <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
            </div>
        </div>

        <DisclosurePanel class="md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
            <div class="pt-4 pb-3 border-t border-gray-700">
                <div class="flex items-center px-5">
                    <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                    </div>
                    <div class="ml-3">
                        <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
                        <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
                    </div>
                    <button type="button" class="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-3 px-2 space-y-1">
                    <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">{{ item.name }}</DisclosureButton>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>

    <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-gray-900"
            >Проекты</h1>
        </div>
    </header>
    <main class="main-content m-3">
        <p>Страница находится в разработке</p>
    </main>

    <footer>
        <div class="m-3 font-semibold">&copy; 2077 And thats all falks</div>
    </footer>
</template>

<script>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {BellIcon, MenuIcon, XIcon} from "@heroicons/vue/outline";
import RoomList from "../components/room/RoomList.vue";
import RoomsJobsMaterialsSum from "../components/room/RoomsJobsMaterialsSum.vue";
import MaterialList from "../components/material/MaterialList.vue";
import MaterialCreateForm from "../components/material/MaterialCreateForm.vue";
import MaterialEditForm from "../components/material/MaterialEditForm.vue";
import MainLink from "../components/nav/MainLink.vue";
import Navbar from "../components/navbar/Navbar.vue";
import {mapActions, mapState} from "vuex";
import store from "../store/index.js";
import router from "../router/index.js";

export default {
    name: 'projects',
    components: {
        Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems,
        BellIcon, MenuIcon, XIcon,
        RoomList, RoomsJobsMaterialsSum,
        MaterialList,MaterialCreateForm, MaterialEditForm, MainLink, Navbar,
    },
    data(){
        return {
            user: {
                name: 'Tom Cook',
                email: 'tom@example.com',
                imageUrl:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            navigation : [
                { name: 'Комнаты', href: 'get-started', current: true },
                { name: 'Команда', href: '#', current: false },
                { name: 'Проекты', href: '#', current: false },
                { name: 'Календарь', href: '#', current: false },
                { name: 'Отчеты', href: '#', current: false },
            ],
            userNavigation : [
                { name: 'Your Profile', href: '#' },
                { name: 'Settings', href: '#' },
            ],
            showMaterialsDialogVisible: false,
            editFormShow: false,
        }
    },
    methods:{
        ...mapActions({
            loadMaterials: 'material/loadMaterials',
        }),
        logout(){
            store.dispatch('logout')
                .then( () => {
                    router.push({
                        name: 'Login',
                    })
                });
        },
        showMaterialsDialog(){
            this.showMaterialsDialogVisible = true;
        }
    },
    computed:{
        ...mapState({
            materials: state => state.material.materials,
        }),
    },
    mounted() {
        this.loadMaterials();
    },
}
</script>

<style scoped>
    #app{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    html{
        height: 100%;
    }
    body{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    header{
        /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
        flex: 0 0 auto;
    }
    .main-content{
        /* 1 flex-grow, 0 flex-shrink, auto flex-basis */
        flex: 1 0 auto;
    }
    footer{
        /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
        flex: 0 0 auto;
    }
</style>
