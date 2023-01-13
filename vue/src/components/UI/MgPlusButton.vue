<template>
    <button
        class="group relative flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium
        rounded-md text-white bg-indigo-600
        hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "mg-plus-button"
}
</script>

<style scoped>

</style>
