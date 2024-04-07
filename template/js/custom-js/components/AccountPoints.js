import {
  i19available,
  i19loyaltyPoints,
  i19pointsEarned,
  i19upTo
} from '@ecomplus/i18n'

import {
  i18n,
  formatDate,
  formatMoney
} from '@ecomplus/utils'

export default {
  name: 'AccountPoints',

  props: {
    customer: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      points: {},
      showSpinner: true
    }
  },

  computed: {
    i19available: () => i18n(i19available),
    i19loyaltyPoints: () => i18n(i19loyaltyPoints),
    i19pointsEarned: () => i18n(i19pointsEarned),
    i19upTo: () => i18n(i19upTo),

    validPointsEntries () {
      const sessionPoints = JSON.parse(window.sessionStorage.getItem('points'))
      console.log(this.points.doppilaLog);
      return this.points.doppilaLog || sessionPoints.doppilaLog || []
    },

    futurePointsEntries () {
      const sessionPoints = JSON.parse(window.sessionStorage.getItem('points'))
      console.log(this.points.futureDoppila)
      return this.points.futureDoppila || sessionPoints.futureDoppila || []
    },

  },

  methods: {
    formatDate,
    formatMoney
  },

  created () {
    window.axios.get(`https://sistema.doppelverso.com.br/ecom/doppila-log/${this.customer.doc_number}`).then(({data}) => {
      this.points = data.data || {
        activeDoppila: "D$ 0.00",
        doppilaLog: [],
        futureDoppila: []
      }
      window.sessionStorage.setItem('points', JSON.stringify(this.points))
      this.showSpinner = false
    })
  }
}
