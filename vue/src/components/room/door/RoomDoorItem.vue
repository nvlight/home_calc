<template>
    <div>
        <div class="font-semibold">{{num}}.</div>
        <ul>
            <li class="font-semibold">id: {{door.id}}</li>
            <li>Длина: {{door.length}} м.</li>
            <li>Высота: {{door.height}} м.</li>
            <li>Ширина (проем): {{door.width}} м.</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'room-door-item',
    props:{
        door: {
            type: Object,
            required: true,
        },
        num: {
            type: [Number, String],
            required: true,
        },
    }
}
</script>

<style scoped>

</style>
