<template>
    <div class="border border-dashed border-2 p-3 rounded-xl" >
        <h1 class="text-xl">Выбор типа потолка</h1>
        <div class="description hidden">
            <h3 class="text-xl">В наличии имеются несколько видов потолков:</h3>
            <ol>
                <li>Матовые</li>
                <li>Глянцевые</li>
                <li>Сатиновые</li>
                <li>Тканевые</li>
                <li>Двухуровневые</li>
                <li>Фотопечать</li>
                <li>Фактурные</li>
                <li>Звездное небо</li>
            </ol>
        </div>
        <select
            @change="calcCeil(square)"
            v-model="choosedCeiling.selected_id"
            name="ceiling_type" id="ceiling_type"
            multiple
            class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                    sm:text-sm mb-3 h-[265px]"
            >
            <option
                v-for="(pot,index) in prices"
                :value="pot.id">{{pot.name}} - ({{ pot.price }} ₽)
            </option>
        </select>
        <div>
            Выбранный элемент select-а
            <strong>{{choosedCeiling.selected_id}}</strong>
        </div>
        <div>
            Потолок - {{square}} кв.м.
        </div>
        <div>
            Стоимость выбранного потолка - <strong>{{choosedCeiling.price}}</strong> ₽.
        </div>
        <button @click="$emit('addCalcedVal', choosedCeiling)"
            class="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"/>
                </svg>
              </span>
            Добавить
        </button>
    </div>
</template>

<script>
export default {
    name: 'CeilingCalc',
    props: ['square'],
    data(){
        return{
            choosedCeiling: {
                selected_id: [],
                price: 0,
            },
            //square: 0,
            prices: [
                {
                    id : 1,
                    name: 'Матовый белый до 3.2м',
                    slug: 'mat_white_3.2',
                    price: 400,
                },
                {
                    id : 2,
                    name: 'Матовый белый до 4м., 5м.',
                    slug: 'mat_white_4',
                    price: 450,
                },
                {
                    id : 3,
                    name: 'Глянцевый белый до 3.2м',
                    slug: 'glossy_white_3.2',
                    price: 450,
                },
                {
                    id : 4,
                    name: 'Глянцевый белый до 4м., 5м',
                    slug: 'glossy_white_4',
                    price: 500,
                },
                {
                    id : 5,
                    name: 'Матовый цветной до 3.2м',
                    slug: 'mat_color_3.2',
                    price: 450,
                },
                {
                    id : 6,
                    name: 'Матовый цветной до 4м., 5м.',
                    slug: 'mat_color_4',
                    price: 500,
                },
                {
                    id : 7,
                    name: 'Глянцевый цветной до 3.2м',
                    slug: 'glossy_color_3.2',
                    price: 550,
                },
                {
                    id : 8,
                    name: 'Глянцевый цветной до 4м., 5м',
                    slug: 'glossy_color_4',
                    price: 600,
                },
                {
                    id :9,
                    name: 'Фактурные до 3.2м',
                    slug: 'textured_3.2',
                    price: 850,
                },
                {
                    id :10,
                    name: 'Искры (эффект) до 3.2м',
                    slug: 'sparks_effect_3.2',
                    price: 1000,
                },
                {
                    id :11,
                    name: 'Облака до 3.2м',
                    slug: 'the_clouds_3.2',
                    price: 1000,
                },
                {
                    id :12,
                    name: 'Фотопечать до 3.2м',
                    slug: 'photo_printing',
                    price: 3500,
                },
            ],
        }
    },
    methods:{
        addCalcedVal(ev){
            if (!this.choosedCeiling.selected_id.length){
                alert('Сначала выберите потолок!')
            }
        },
        calcCeil(square, ev){
            let seil_select_id = this.choosedCeiling.selected_id;
            if (seil_select_id.length){
                let index = seil_select_id[0];
                let summ  = 0;

                for ( let price in this.prices){
                    //console.log(price)
                    let iteam = this.prices[price];
                    if (iteam.id === index){
                        this.choosedCeiling.price = square * iteam.price;
                    }
                }

                //console.log('summ: '+summ);
            }
        }
    },
    created(){
         console.log('created')
    }
}

</script>

<style>
</style>
