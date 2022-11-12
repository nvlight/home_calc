<template>
    <div>
        <h1>MaterialsList</h1>
        <div>materials: {{materials}}</div>

        <div v-for="material in materials"
            :key="material.id"
        >
            <ul>
                <li>{{material.title}}</li>
                <li>{{material.price}}</li>
                <li>{{material.unit}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import MaterialItem from "./MaterialItem.vue";

export default {
    name: 'material-list',
    components: {
        MaterialItem,
    },
    props: {
        'materials': {
            type: Array,
            required: true,
        },
    },
}
</script>

<style scoped>

</style>
