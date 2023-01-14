<template>
    <template v-if="materials.length">
        <div class="font-medium mt-2">Материалы к покупке:</div>
        <div
            v-for="(material, index) in materials"
            :key="index"
            class="flex justify-between"
        >
            <div>
                <span>{{index+1}}. </span>
                <span>{{material.title}}: </span>
            </div>
            <div class="self-center flex ">
                <span class="font-semibold">{{material.amount}}</span>
                <template v-if="+material.amount !== +material.amount_add_info">
                    <span class="ml-1 font-semibold">({{ material.amount_add_info }})</span>
                </template>
                <span class="font-semibold">&nbsp;{{material.unit_name}}</span>
            </div>

        </div>

        <div class="hidden mt-1">
            <mg-button @click="">Добавить рекомендованные материалы</mg-button>
        </div>
    </template>
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
