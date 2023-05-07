<template>
    <div class="flex flex-wrap justify-between items-center mt-3">
        <span class="">{{ first }}</span>
        <input
            v-if="modelValue !== null"
            class="text-right appearance-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                   rounded-b-md rounded-t-md
                   w-16
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
           type="text"
           v-model="modelValue"
           @input="updateModelValue($event)"
           placeholder="0"
        >
        <strong class="">{{ sum }} {{ third }}</strong>
    </div>
</template>

<script>
export default {

    props:{
        first: {
            type: String,
            required: true,
        },
        modelValue: {
            required: false,
            default: null,
        },
        sum:{
            required: false,
        },
        third: {
            type: String,
            required: true,
        },
    },

    methods:{
        updateModelValue(e){
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
