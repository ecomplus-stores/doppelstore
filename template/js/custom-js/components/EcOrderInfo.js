import {
  i19buyAgain,
  i19cancelOrder,
  i19codeCopied,
  i19copyCode,
  i19copyErrorMsg,
  i19days,
  i19doPaymentMsg,
  i19freight,
  i19login,
  i19loginForOrderDetailsMsg,
  i19myOrders,
  i19notes,
  i19of,
  i19orderConfirmationMsg,
  i19orderNumber,
  i19printBillet,
  i19redirectToPayment,
  i19referenceCode,
  i19reopenOrder,
  i19shippingAddress,
  i19transactionCode,
  i19ticketCode,
  i19trackDelivery,
  i19unsubscribe,
  i19zipCode,
  i19FinancialStatus,
  i19FulfillmentStatus,
  i19OrderStatus
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney,
  formatDate
} from '@ecomplus/utils'

import { store } from '@ecomplus/client'
import vSelect from 'vue-select'
import ecomPassport from '@ecomplus/passport-client'
import ecomCart from '@ecomplus/shopping-cart'
import EcomSearch from '@ecomplus/search-engine'
import ShippingLine from '@ecomplus/storefront-components/src/ShippingLine.vue'
import EcSummary from '@ecomplus/storefront-app/src/components/EcSummary.vue'

export default {
  name: 'EcOrderInfo',

  components: {
    ShippingLine,
    EcSummary,
    vSelect
  },

  props: {
    order: {
      type: Object,
      required: true
    },
    isNew: Boolean,
    skipDataLoad: Boolean,
    skipFirstDataLoad: Boolean,
    skipCustomerUpdate: Boolean,
    accountOrdersUrl: {
      type: String,
      default: '/app/#/account/orders'
    },
    cartUrl: {
      type: String,
      default: '/app/#/cart'
    },
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    },
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    },
    invoiceBaseLink: {
      type: String,
      default: 'https://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConteudo=7PhJ+gAVw2g=&tipoConsulta=resumo&nfe='
    }
  },

  data () {
    return {
      isLoaded: this.skipDataLoad || this.skipFirstDataLoad,
      isUpdating: false,
      reloadInterval: null,
      orderBody: this.order,
      canReopenOrder: false,
      validThruTimer: null,
      validThruRemainingTime: null,
      receiveDoppila: null,
      optionSubscription: null,
      canModifySubscriptionBonus: null,
      canModifySubscriptionShirt: null,
      sizes: [],
      listOptions: [],
      size: null,
      sizeLabel: null,
    }
  },

  computed: {
    i19buyAgain: () => i18n(i19buyAgain),
    i19cancelOrder: () => i18n(i19cancelOrder),
    i19codeCopied: () => i18n(i19codeCopied),
    i19copyCode: () => i18n(i19copyCode),
    i19copyErrorMsg: () => i18n(i19copyErrorMsg),
    i19days: () => i18n(i19days),
    i19doPaymentMsg: () => i18n(i19doPaymentMsg),
    i19expirationDate: () => 'Prazo de vencimento',
    i19freight: () => i18n(i19freight),
    i19login: () => i18n(i19login),
    i19loginForOrderDetailsMsg: () => i18n(i19loginForOrderDetailsMsg),
    i19myOrders: () => i18n(i19myOrders),
    i19notes: () => i18n(i19notes),
    i19of: () => i18n(i19of),
    i19orderConfirmationMsg: () => i18n(i19orderConfirmationMsg),
    i19orderNumber: () => i18n(i19orderNumber),
    i19printBillet: () => i18n(i19printBillet),
    i19redirectToPayment: () => i18n(i19redirectToPayment),
    i19referenceCode: () => i18n(i19referenceCode),
    i19reopenOrder: () => i18n(i19reopenOrder),
    i19shippingAddress: () => i18n(i19shippingAddress),
    i19transactionCode: () => i18n(i19transactionCode),
    i19ticketCode: () => i18n(i19ticketCode),
    i19trackDelivery: () => i18n(i19trackDelivery),
    i19unsubscribe: () => i18n(i19unsubscribe),
    i19zipCode: () => i18n(i19zipCode),
    i19invoice: () => 'Nota fiscal',

    isSubscriptionDoppel () {
      return this.orderBody && this.orderBody.transactions && this.orderBody.transactions.length && this.orderBody.transactions.some(({type}) => type === "recurrence") && (this.status !== 'cancelled')
    },

    localOrder: {
      get () {
        return this.orderBody
      },
      set (body) {
        this.orderBody = body
        this.$emit('update:order', body)
        this.saveCustomerOrder()
      }
    },

    hasManyTransactions () {
      const { transactions } = this.localOrder
      return transactions && transactions.length > 1
    },

    transaction () {
      const { transactions } = this.localOrder
      return transactions && transactions.length
        ? transactions[0]
        : {}
    },

    validThru () {
      const transactionMethod = this.transaction['banking_billet'] || this.transaction['account_deposit']
      return transactionMethod && transactionMethod.valid_thru
    },

    getSelect (event) {
      console.log(event)
    }, 

    shippingAddress () {
      const { localOrder } = this
      if (localOrder.shipping_lines && localOrder.shipping_lines.length) {
        return localOrder.shipping_lines[0].to
      }
      return undefined
    },

    canShowShippingAddress () {
      const { localOrder, shippingAddress } = this
      if (shippingAddress && shippingAddress.street) {
        return !/(retira|pick\s?up|e-?mail)/i.test(localOrder.shipping_method_label)
      }
      return false
    },

    status () {
      return this.localOrder.status
    },

    financialStatus () {
      const { localOrder, transaction } = this
      if (localOrder.payments_history) {
        const transaction = localOrder.transactions &&
          localOrder.transactions.find((transaction) => {
            return transaction.payment_method.code !== 'loyalty_points'
          })
        let statusRecord
        localOrder.payments_history.forEach(record => {
          if (
            record &&
            (!transaction || !record.transaction_id ||
              record.transaction_id === transaction._id) &&
            (!statusRecord || !record.date_time ||
              new Date(record.date_time).getTime() >= new Date(statusRecord.date_time).getTime())
          ) {
            statusRecord = record
          }
        })
        if (statusRecord) {
          return statusRecord.status
        }
      }
      const status = localOrder.financial_status && localOrder.financial_status.current
      if (status) {
        return status
      } else {
        if (transaction && transaction.status) {
          return transaction.status.current
        }
      }
      return 'pending'
    },

    fulfillmentStatus () {
      const { localOrder } = this
      const status = localOrder.fulfillment_status && localOrder.fulfillment_status.current
      if (status) {
        return status
      } else {
        const shippingLine = localOrder.shipping_lines && localOrder.shipping_lines[0]
        if (shippingLine && shippingLine.status) {
          return shippingLine.status.current
        }
      }
      return null
    },

    statusEntries () {
      const statusEntries = []
      let statusRecords = []
      ;['payments_history', 'fulfillments'].forEach(recordsField => {
        if (Array.isArray(this.localOrder[recordsField])) {
          statusRecords = statusRecords.concat(this.localOrder[recordsField])
        }
      })
      if (statusRecords.length) {
        statusRecords = statusRecords = statusRecords.sort((a, b) => {
          if (a.date_time && b.date_time) {
            return new Date(a.date_time).getTime() > new Date(b.date_time).getTime()
              ? -1
              : 1
          }
          return 0
        })
        statusRecords.forEach((statusRecord, i) => {
          if (i > 0 && statusRecord.status === statusRecords[i - 1].status) {
            return
          }
          statusEntries.push(statusRecord)
        })
      }
      return statusEntries
    },

    isAuthenticated () {
      return this.ecomPassport.checkAuthorization()
    },

    isSchrodinger () {
      return this.localOrder.items.some(({sku}) => sku.includes('caixa-de-schrodinger'))
    },

    isSubscription () {
      return this.localOrder.transactions &&
        this.localOrder.transactions.find(({ type }) => type === 'recurrence')
    },

    isBox () {
      return this.receiveDoppila === 'box'
    }
  },

  methods: {
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19FulfillmentStatus: prop => i18n(i19FulfillmentStatus)[prop],
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop],
    formatMoney,
    formatDate,

    formatTime (time) {
      const miliseconds = Date.parse(time)
      const date = new Date(miliseconds)
      return date.toLocaleTimeString()
    },

    toClipboard (text) {
      this.$copyText(text).then(() => {
        this.$toast({
          title: this.i19codeCopied,
          body: text,
          variant: 'success',
          delay: 2000
        })
      }, err => {
        console.error(err)
        this.$toast({
          title: 'Oops',
          body: `${this.i19copyErrorMsg}: <i>${text}</i>`,
          variant: 'warning',
          delay: 3000
        })
      })
    },

    saveCustomerOrder () {
      const { localOrder, ecomPassport } = this
      if (!this.skipCustomerUpdate && localOrder.number && ecomPassport.checkAuthorization()) {
        if (
          localOrder.transactions && localOrder.transactions.find(transaction => {
            return transaction.payment_method.code === 'loyalty_points'
          })
        ) {
          ecomPassport.setCustomer({ loyalty_points_entries: [] })
        }
        ecomPassport.requestApi('/me.json')
          .then(({ data }) => {
            const orders = data.orders
              ? data.orders.slice(-300)
              : []
            const resumedOrderBody = {}
            ;[
              '_id',
              'created_at',
              'number',
              'currency_id',
              'currency_symbol',
              'amount',
              'payment_method_label',
              'shipping_method_label'
            ].forEach(field => {
              if (localOrder[field]) {
                resumedOrderBody[field] = localOrder[field]
              }
            })
            const orderIndex = orders.findIndex(({ _id, number }) => {
              return _id === localOrder._id || number === localOrder.number
            })
            if (orderIndex > -1) {
              Object.assign(orders[orderIndex], resumedOrderBody)
            } else {
              orders.push(resumedOrderBody)
            }
            ecomPassport.requestApi('/me.json', 'patch', { orders })
          })
      }
    },

    buyAgain () {
      const { localOrder } = this
      if (localOrder.items) {
        const { items } = localOrder
        ecomCart.clear()
        items.forEach((item, i) => {
          ecomCart.addItem(item, false)
          if (i + 1 === items.length) {
            ecomCart.save()
            window.location = this.cartUrl
          }
        })
      }
    },

    toggle () {
      this.isUpdating = true
      const data = this.localOrder.status !== 'cancelled'
        ? {
            status: 'cancelled',
            cancel_reason: 'customer'
          }
        : {
            status: 'open'
          }
      ecomPassport.requestApi(`/orders/${this.order._id}.json`, 'patch', data)
        .then(() => {
          this.localOrder = {
            ...this.localOrder,
            ...data
          }
        })
        .finally(() => {
          this.isUpdating = false
        })
    }
  },

  watch: {
    isLoaded: {
      handler (isLoaded) {
        if (isLoaded && this.isAuthenticated && this.status === 'cancelled') {
          const { items } = this.localOrder
          if (items && items.length) {
            const productIds = items.map(item => item.product_id)
            const search = new EcomSearch()
            search.setPageSize(productIds.length)
              .setProductIds(productIds)
              .fetch(true)
              .then(() => {
                for (let i = 0; i < items.length; i++) {
                  const orderItem = items[i]
                  const product = search.getItems().find(({ _id }) => _id === orderItem.product_id)
                  if (product) {
                    if (orderItem.variation_id) {
                      if (product.variations) {
                        const variation = product.variations.find(({ sku }) => sku === orderItem.sku)
                        if (variation && variation.quantity >= orderItem.quantity) {
                          continue
                        }
                      }
                    }
                    if (product.quantity >= orderItem.quantity) {
                      continue
                    }
                  }
                  this.canReopenOrder = false
                  return
                }
                this.canReopenOrder = true
              })
              .catch(console.error)
          }
        }
      },
      immediate: true
    },

    receiveDoppila: {
      handler (newOption) {
        console.log('new option', newOption)
        window.axios.post(`https://sistema.doppelverso.com.br/ecom/doppila-or-box/${this.order.number}`, {
          choice: newOption
        }).then((res) => {
        if (this.canModifySubscriptionBonus && this.isBox) {
          window.axios.get(`https://sistema.doppelverso.com.br/ecom/box-tshirt-choice/${this.order.number}`).then(({data}) => {
            console.log(data)
            this.sizes = data.options
            this.listOptions = Object.keys(this.sizes)
            this.canModifySubscriptionShirt = data['can-modify']
          })
        }
      })
      }
    },

    size: {
      handler (newOption) {
        console.log('new size', newOption)
        window.axios.post(`https://sistema.doppelverso.com.br/ecom/box-tshirt-choice/${this.order.number}`, {
          size: this.sizes[newOption]
        }).then((res) => {
          console.log('right', res.data)
      })
      }
    }
  },

  created () {
    if (this.order._id) {
      if (this.isNew) {
        this.saveCustomerOrder()
      }
      window.axios.get(`https://sistema.doppelverso.com.br/ecom/doppila-or-box/${this.order.number}`).then(({data}) => {
        this.receiveDoppila = data.choice
        this.optionSubscription = data.options
        this.canModifySubscriptionBonus =  data['can-modify']
        if (this.canModifySubscriptionBonus && this.isBox) {
          window.axios.get(`https://sistema.doppelverso.com.br/ecom/box-tshirt-choice/${this.order.number}`).then(({data}) => {
            for (const [key, value] of Object.entries(data.options)) {
                if (value === data.size) {
                  this.sizeLabel = key
                  break
                }
             }
            console.log(data)
            console.log(sizeLabel)
          })
        }
      })
      if (!this.skipDataLoad) {
        const url = `/orders/${this.order._id}.json`
        const update = () => {
          const request = this.ecomPassport.checkAuthorization()
            ? this.ecomPassport.requestApi(url)
            : store({ url })
          return request
            .then(({ data }) => {
              this.localOrder = {
                ...this.localOrder,
                ...data
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        this.reloadInterval = setInterval(update, 9000)
        if (!this.skipFirstDataLoad) {
          setTimeout(() => {
            update().finally(() => {
              this.isLoaded = true
            })
          }, this.isNew ? 1000 : 3000)
        }
      }
    }
  },

  mounted () {
    if (this.validThru) {
      const validDate = new Date(this.validThru)
      const now = Date.now()
      if (validDate.getTime() > now) {
        let targetDate
        const dayMs = 24 * 60 * 60 * 1000
        const daysBetween = Math.floor((validDate.getTime() - now) / dayMs)
        if (daysBetween > 2) {
          targetDate = new Date()
          targetDate.setHours(23, 59, 59, 999)
        } else {
          targetDate = validDate
        }
        const formatTime = (number) => number < 10 ? `0${number}` : number
        const getRemainingTime = () => {
          const distance = targetDate.getTime() - Date.now()
          const days = Math.floor(distance / dayMs)
          const hours = Math.floor((distance % dayMs) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          return (days > 0 ? `${formatTime(days)} ${i19days} - ` : '') +
            `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
        }
        this.validThruTimer = setInterval(() => {
          this.validThruRemainingTime = getRemainingTime()
        }, 1000)
      }
    }
  },

  beforeDestroy () {
    clearInterval(this.reloadInterval)
    if (this.validThruTimer) {
      clearInterval(this.validThruTimer)
    }
  }
}
