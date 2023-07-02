<template>
    <div id="affiliate-link">
      <a-alert v-if="!isLogged">
        <a href="#" @click.prevent="login" class="alert-link">Faça login</a>
        em sua conta da loja para acessar seu link indicação
      </a-alert>
      <template v-else>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <button
                :class="`btn btn-outline-${(copyIconClass === 'i-check' ? 'success' : 'secondary')}`"
                :disabled="copyIconClass === 'i-check'"
                type="button"
                @click="() => toClipboard(link)"
              >
                <span class="d-inline-block" style="width: 26px">
                  <i :class="copyIconClass"></i>
                </span>
                Copiar
              </button>
            </div>
            <input
              type="text"
              class="form-control"
              readonly
              :value="link"
              @focus="$event.target.select()"
            />
          </div>
        </div>
        <button
          class="btn btn-primary"
          @click="share"
        >
          <i class="i-chevron-right mr-1"></i>
          Compartilhe seu link
        </button>
      </template>
    </div>
  </template>
  
  <script>
  import Vue from 'vue'
  import ecomPassport from '@ecomplus/passport-client'
  import VueClipboard from 'vue-clipboard2'
  import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
  
  Vue.use(VueClipboard)
  
  export default {
    name: 'AffiliateLink',
  
    components: {
      AAlert
    },
  
    data () {
      return {
        isLogged: false,
        link: '',
        copyIconClass: 'i-copy'
      }
    },
  
    methods: {
      login () {
        const loginButton = document.getElementById('user-button')
        if (loginButton) {
          loginButton.click()
        } else {
          window.location = '/app/#/account/'
        }
      },
  
      setLink () {
        const customer = ecomPassport.getCustomer()
        this.link = `https://${window.location.host}/` +
          `?coupon=CONVITEESPECIAL&referral=${customer._id}`
      },
  
      share () {
        const text = 'Compre a melhor camisa com a Doppel ' +
          'com R$ 25,00 de desconto através desse link!';
        const share = async () => {
          try {
            await navigator.share({
              title: 'Doppel Store - Convite especial: Ganhe R$ 25,00',
              text,
              url: this.link
            })
          } catch (err) {
            console.error(err)
            if (typeof navigator.share !== 'function') {
              const wppLink = 'https://web.whatsapp.com/send?text=' +
                encodeURIComponent(text + ' ' + this.link)
              window.open(wppLink, '_blank')
            }
          }
        }
        share()
      },
  
      toClipboard (text) {
        this.$copyText(text).then(() => {
          this.copyIconClass = 'i-check'
          setTimeout(() => {
            this.copyIconClass = 'i-copy'
          }, 3000)
        }, err => {
          console.error(err)
        })
      }
    },
  
    created () {
      this.isLogged = ecomPassport.checkLogin()
      if (this.isLogged) {
        this.setLink()
      } else {
        ecomPassport.on('login', () => {
          this.isLogged = true
          this.setLink()
        })
      }
    },
  }
  </script>
  