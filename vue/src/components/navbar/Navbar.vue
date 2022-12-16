<template>
    <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']" :aria-current="item.current ? 'page' : undefined"
    >{{ item.name }}</router-link>
</template>

<script>
export default {
    name: 'navbar',

    data(){
        return {
            navigation : [
                { name: 'Комнаты', href: 'get-started', current: true },
                // { name: 'Проекты', href: 'projects', current: false },
                //{ name: 'Команда', href: '#', current: false },
                //{ name: 'Календарь', href: '#', current: false },
                //{ name: 'Отчеты', href: '#', current: false },
            ],
        }
    }
}
</script>

<style scoped>

</style>
