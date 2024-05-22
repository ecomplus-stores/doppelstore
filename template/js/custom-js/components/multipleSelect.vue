<template>
    <div id="ghanor-block">
      <template>
        <h2>{{ formatMoney(amount) }}</h2>
      </template>
    </div>
  </template>
  
  <script>

import {
  i18n,
  price as getPrice,
  onPromotion as checkOnPromotion,
  formatMoney
} from '@ecomplus/utils'

  export default {
    name: 'GhanorSummary',
  
    components: {
    },
  
    data () {
      return {
        isLogged: false,
        link: '',
        copyIconClass: 'i-copy',
        currentLocation: window.location.href,
        amount: 0,
        quantity: 0
      }
    },
  
    methods: {
      formatMoney,
      
      getPoints () {
        axios.get('https://us-central1-ecom-ghanor.cloudfunctions.net/app/4566/products')
        .then(({ data }) => {
          if (data && data.data && data.data.length) {
            data.data.forEach(item => {
              this.quantity += item.quantity
              this.amount += item.total
            })
          }
        })      
    },

  
      
  
  },
  
    created () {
    },

    mounted () {   
      this.getPoints()
    }
  }
  </script>
  