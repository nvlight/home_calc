<template>
    <label>
        <div><slot></slot></div>
        <input
            :value="modelValue"
            @input="updateInput"
            type="text"
            class="appearance-none relative block px-1 py-1 border border-gray-300 placeholder-gray-500
                text-gray-900
                sm:text-sm
                sm:w-fit
                mr-1
                rounded-b-md rounded-t-md
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10
            "
            style="width: 5rem;"
            :class="classes"
            :placeholder="placeholder">
    </label>
</template>




<script>
export default {
    name: 'mg-input-labeled-2',
    props: {
        modelValue: {
            type: [String, Number],
        },
        placeholder: {
            type: [String, Number],
        },
        classes: {
            type: String,
        },
        emits: ['update:modelValue'],
    },
    methods: {
        updateInput(event){
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
</style>
