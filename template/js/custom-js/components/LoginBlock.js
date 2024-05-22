import {
  i19continue,
  i19enterYourDocNumberMsg,
  i19enterYourEmailMsg,
  i19helloAgain,
  i19identifyYourAccount,
  i19invalidLoginInfoMsg,
  i19loginErrorMsg,
  i19manageYourPurchaseHistory,
  i19notifyAboutOrders,
  i19oauthOnPopup,
  i19orProceedWith,
  i19signInWith,
  i19weUseYourDataToMsg
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
import InputDocNumber from '@ecomplus/storefront-components/src/InputDocNumber.vue'
import vSelect from 'vue-select'

export default {
  name: 'LoginBlock',

  components: {
    AAlert,
    InputDocNumber,
    vSelect
  },

  props: {
    customerEmail: String,
    canAcceptGuest: {
      type: Boolean,
      default: true
    },
    canFetchOauth: {
      type: Boolean,
      default: true
    },
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    },
    isSubscription: Boolean
  },

  data () {
    return {
      email: this.customerEmail,
      docNumber: '',
      isCompany: false,
      oauthProviders: [],
      isWaitingPopup: false,
      isWaitingLogin: false,
      failAlertText: null,
      size: null,
      sizes: [],
      listOptions: []
    }
  },

  computed: {
    i19continue: () => i18n(i19continue),
    i19enterYourDocNumberMsg: () => i18n(i19enterYourDocNumberMsg),
    i19enterYourEmailMsg: () => i18n(i19enterYourEmailMsg),
    i19helloAgain: () => i18n(i19helloAgain),
    i19identifyYourAccount: () => i18n(i19identifyYourAccount),
    i19manageYourPurchaseHistory: () => i18n(i19manageYourPurchaseHistory),
    i19notifyAboutOrders: () => i18n(i19notifyAboutOrders),
    i19oauthOnPopup: () => i18n(i19oauthOnPopup),
    i19orProceedWith: () => i18n(i19orProceedWith),
    i19signInWith: () => i18n(i19signInWith),
    i19weUseYourDataToMsg: () => i18n(i19weUseYourDataToMsg),
    isLpSubscription () {
      return window.location.hash && window.location.hash.includes('/lp/') && this.isSubscription && !this.size
    }
  },

  methods: {
    confirmAccount () {
      const { checkLogin, checkAuthorization, getCustomer } = this.ecomPassport
      const isIdentified = checkLogin() && !checkAuthorization() &&
        getCustomer().main_email === this.email
      if (isIdentified) {
        this.$nextTick(() => {
          if (this.$refs.InputDoc) {
            this.$refs.InputDoc.$el.focus()
          }
        })
      }
      return isIdentified
    },

    getSelect (option) {
      console.log(option)
      const selectedOption = Object.keys(this.sizes).reduce((acc, key) => {
        //console.log(key, this.sizes[key], option, this.sizes[key] === option)
        if (key === option) {
          console.log('entrei')
          acc = this.sizes[key];
          console.log(acc)
        }
        return acc;
      }, null);
      window.selectedOption = selectedOption
      window.sessionStorage.setItem('selectedOption', selectedOption)
    },

    submitLogin () {
      if (!this.isWaitingLogin) {
        this.isWaitingLogin = true
        this.failAlertText = null
        const { docNumber } = this
        const email = this.email && this.email.toLowerCase()
        const isAccountConfirm = this.confirmAccount()
        const emitUpdate = () => this.$emit('update', { email, docNumber })
        this.ecomPassport.fetchLogin(email, isAccountConfirm ? docNumber : null)
          .then(() => {
            if (isAccountConfirm) {
              emitUpdate()
            }
          })
          .catch(err => {
            const { response } = err
            if (!response || response.status !== 403) {
              console.error(err)
              this.failAlertText = i18n(i19loginErrorMsg)
            } else if (!isAccountConfirm && this.canAcceptGuest) {
              this.$emit('update:customer-email', email)
              emitUpdate()
            } else {
              this.failAlertText = i18n(i19invalidLoginInfoMsg)
            }
          })
          .finally(() => {
            this.isWaitingLogin = false
          })
      }
    },

    oauthPopup (fnOrLink) {
      if (typeof fnOrLink === 'function') {
        fnOrLink()
      } else {
        this.ecomPassport.popupOauthLink(fnOrLink)
      }
      this.isWaitingPopup = true
      setTimeout(() => {
        this.isWaitingPopup = false
      }, 7500)
    }
  },

  watch: {
    email () {
      this.failAlertText = null
    },

    docNumber () {
      this.failAlertText = null
    }
  },

  created () {
    window.axios.get(`https://sistema.doppelverso.com.br/ecom/box-tshirt-choice/135402`).then(({data}) => {
      this.listOptions = Object.keys(data.options)
      this.sizes = data.options
    })
    if (Array.isArray(window.OAUTH_PROVIDERS)) {
      this.oauthProviders = []
      if (window.OAUTH_PROVIDERS.includes('google') && window.signInWithGoogle) {
        this.oauthProviders.push({
          link: window.signInWithGoogle,
          faIcon: 'fa-google',
          provider: 'google',
          providerName: 'Google'
        })
      }
      if (window.OAUTH_PROVIDERS.includes('facebook') && window.signInWithFacebook) {
        this.oauthProviders.push({
          link: window.signInWithFacebook,
          faIcon: 'fa-facebook-f',
          provider: 'facebook',
          providerName: 'Facebook'
        })
      }
      if (this.oauthProviders.length) return
    }
    if (!this.canFetchOauth) return
    this.ecomPassport.fetchOauthProviders()
      .then(({ host, baseUri, oauthPath, providers }) => {
        const oauthProviders = []
        for (const provider in providers) {
          if (providers[provider]) {
            const { faIcon, providerName } = providers[provider]
            let link = host + baseUri + provider + oauthPath
            const referral = typeof window === 'object' &&
              window.sessionStorage.getItem('ecomReferral')
            if (referral) {
              link += `?referral=${referral}`
            }
            oauthProviders.push({
              link,
              faIcon,
              provider,
              providerName
            })
          }
        }
        this.oauthProviders = oauthProviders
      })
      .catch(err => {
        console.error(err)
      })
  },

  mounted () {
    if (this.$refs.inputEmail) {
      this.$refs.inputEmail.focus()
    }
    const { checkLogin, checkAuthorization, getCustomer } = this.ecomPassport
    const handleLogin = () => {
      if (checkAuthorization()) {
        this.$emit('login', this.ecomPassport)
      } else if (checkLogin()) {
        const customer = getCustomer()
        this.email = customer.main_email
        this.isCompany = customer.registry_type === 'j'
        if (customer._id && customer.doc_number) {
          this.$emit('login', this.ecomPassport)
        }
      }
    }
    ecomPassport.on('login', () => {
      this.isWaitingPopup = false
      handleLogin()
    })
    handleLogin()
  }
}
