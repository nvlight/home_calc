export default {
    name: 'focus',
    mounted(elem, binding, vnode, prevVnode){
        elem.focus();
        //console.log(binding, vnode, prevVnode);
    }
}
