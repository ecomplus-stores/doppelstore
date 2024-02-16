<template>
    <div id="ghanor-block">
      <template>

        <a-share
          v-if="currentLocation"
          class="mb-3"
          :url="currentLocation"
          :title="`Compartilhe o projeto`"
        />
      </template>
    </div>
  </template>
  
  <script>

  import AShare from '@ecomplus/storefront-components/src/AShare.vue'

  export default {
    name: 'GhanorSummary',
  
    components: {
      AShare
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
      getPoints () {
        axios.get('https://us-central1-ecom-ghanor.cloudfunctions.net/app/4566/products', {   
          headers: {
            "Content-Type": "application/json",
            "x-server-token": "423B726488D7972D6A2FABDC6C6E6"
          }
        })
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
  