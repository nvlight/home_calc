export default {
    props:{

    },
    data(){
        return {

        }
    },
    methods: {
        perim(...args){
            const res = args.reduce( (a,b) => (
                a + +b
            ), 0)
            const toFixed = +res.toFixed(2);

            return {
                value: toFixed,
                ceiled: Math.ceil(toFixed)
            }
        },
        squa(...args){
            const res = args.reduce( (a, b) => (
                a * +b
            ), 1)
            const toFixed = +res.toFixed(2);

            return {
                value: toFixed,
                ceiled: Math.ceil(toFixed)
            }
        },
    },
    computed:{

    },
    mounted() {
        console.log('Mixin - MainCalc: mounted!');
    },

}

