<template>
    <div
        class="dialog"
        v-if="show"
        @click="hideDialog"
    >
        <div class="dialog__content relative"
             @click.stop
        >
            <mg-close-icon-button
                @click="hideDialog"
                class="absolute right-1 top-1 border-blue-400"></mg-close-icon-button>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mg-dialog',
    components: {},

    props:{
        show: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
        }
    },
    methods: {
        hideDialog(){
            this.$emit('update:show', false);
        },
    },
    computed:{

    },
    mounted(){
    },
}
</script>

<style scoped>
.dialog{
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;
}
.dialog__content{
    margin: auto;
    width: 90%;
    margin-top: 20px;
    margin-bottom: 20px;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
    overflow-y: scroll;
}
</style>
