<template>
    <div class="windows_wrapper border-b border-gray-500 pb-1"
         v-if="is_windows_showing">
        <div class="flex">
            <div class="mr-2">
                <label class="">
                    <span>Длина</span>
                    <input required
                           v-model="windows_add.length"
                           class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="1.2">
                </label>
            </div>
            <div class="mr-2">
                <label class="">
                    <span>Высота</span>
                    <input required
                           v-model="windows_add.height"
                           class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                           placeholder="1.2">
                </label>
            </div>
            <div class="mr-2">
                <label class="">
                    <span>Ширина (проем)</span>
                    <input  required
                            v-model="windows_add.width"
                            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                   rounded-b-md rounded-t-md
                                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="1.2">
                </label>
            </div>
        </div>
        <div class="mt-3">
            <button
                @click="addWindow"
                class="py-2 px-4
                        border border-transparent
                        text-sm font-medium rounded-md text-white bg-indigo-600
                        hover:bg-indigo-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-indigo-500">
                <span class="">Добавить окно</span>
            </button>
        </div>

        <div v-if="windows" class="mt-3">
            <div v-for="(window, key) in this.room.windows"
                 class="flex items-center justify-between
                        ">
                <div>
                    <div class="font-semibold">{{key+1}}.</div>
                    <ul>
                        <li>Длина: {{window.length}} м.</li>
                        <li>Высота: {{window.height}} м.</li>
                        <li>Ширина (проем): {{window.width}} м.</li>
                    </ul>
                </div>
                <div>
                    <button
                        @click="deleteWindow(window.id)"
                        class="ml-1 p-1
                                text-red-500
                                rounded-full
                                focus:outline-none
                                border border-transparent
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-red-300
                                ">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div v-else="">
            <span class="font-light">Нет окон</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'room-window',
    props: {
        is_windows_showing: {
            type: Boolean,
            default: false,
        },
        windows: {
            type: Object,
            required: true,
        }
    },
    data(){
        return {
            windows_add:{
                length: 1.2,
                height: 1.1,
                width: 0.4,
            },
        }
    },
    methods: {
        addWindow(){
            if (!this.windows_add.height || !this.windows_add.length || !this.windows_add.width){
                alert('Параметры окна не должны быть пустыми!');
                return;
            }

            const res = {
                windows_add: this.windows_add,
                room_id: this.room.id,
            };
            res.windows_add.id = this.room.windows.length + 1;

            const newWindow = res.windows_add;

            const cloneWindow = Object.assign({}, newWindow);
            this.room.windows.push(cloneWindow);
        },
        deleteWindow(del_id){
            const res = {
                del_id: del_id,
                room_id: this.room.id,
            };

            this.room.windows = this.room.windows.filter(
                t => t.id != res.del_id
            );
        },
    },

    mounted() {

    }
}
</script>

<style scoped>

</style>
