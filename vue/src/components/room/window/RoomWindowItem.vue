<template>
    <div class="flex items-center justify-between">
        <div class="flex flex-wrap">
            <div>
                <span class="font-semibold">{{window.id}}. </span>
                Длина: {{window.length}} м., высота: {{window.height}} м.,
                ширина (проем): {{window.width}} м.
            </div>
        </div>
        <mg-trash-icon-button @click="del(window.id)"></mg-trash-icon-button>
    </div>
</template>

<script>
export default {
    name: 'room-door-item',
    props:{
        window: {
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
