<template>
    <div class="mt-2">

    </div>
    <div class="font-medium">Материалы к покупке:</div>
    <div
        v-for="(material, index) in materials"
        :key="index"
        class="flex justify-between"
    >
        <div>
            <span>{{index+1}}. </span>
            <span>{{material.title}}: </span>
        </div>
        <div class="ml-1 self-center">
            <span class="font-semibold">{{material.amount}}</span>
            <span>&nbsp;{{material.unit_name}}</span>
        </div>

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
