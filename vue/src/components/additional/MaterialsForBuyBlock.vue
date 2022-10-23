<template>
    <div class="mt-2">

    </div>
    <div class="font-medium">Материалы к покупке:</div>
    <div
        v-for="material in materials">
        <span>{{material.title}}: </span><span>{{material.description}}</span>
    </div>
</template>

<script>
export default {
    name: "materials-for-buy-block",
    props: {
        materials: {
            type: Array,
            required: true,
        },
        room: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style scoped>

</style>
