<template>
    <div class="flex items-center justify-between">
        <div class="flex flex-wrap">
            <div>
                <span class="font-semibold">{{door.id}}. </span>
                Длина: {{door.length}} м., высота: {{door.height}} м.,
                ширина (проем): {{door.width}} м.
            </div>
        </div>
        <mg-trash-icon-button @click="del(door.id)"></mg-trash-icon-button>
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
    },
    methods:{
        del(id){
            if (confirm('Действительно удалить элемент?')){
                this.$emit('del', id);
            }
        },
    },
}
</script>

<style scoped>

</style>
