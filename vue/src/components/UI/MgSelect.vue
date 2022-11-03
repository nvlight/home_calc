<template>
    <select v-model="modelValue"
        @change="changeOption"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
        <option disabled value="">Выберите из списка</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{option.name}}
        </option>
    </select>
</template>

<script>
export default {
    name: "mg-select",
    props:{
        modelValue: {
            type: String,
        },
        options: {
            type: Array,
            default: () => [],
        }
    },
    methods: {
        changeOption(event){
            this.$emit('update:modelValue', event.target.value)
        },
    }
}
</script>

<style scoped>

</style>
