import {
  i19addToFavorites,
  i19buy,
  i19close,
  i19days,
  i19discountOf,
  i19endsIn,
  i19freeShippingFrom,
  i19loadProductErrorMsg,
  i19offer,
  i19only,
  i19outOfStock,
  i19paymentOptions,
  i19perUnit,
  i19productionDeadline,
  i19removeFromFavorites,
  i19retry,
  i19selectVariationMsg,
  i19unavailable,
  i19units,
  i19unitsInStock,
  i19workingDays
} from '@ecomplus/i18n'

import {
  i18n,
  randomObjectId as genRandomObjectId,
  name as getName,
  inStock as checkInStock,
  onPromotion as checkOnPromotion,
  price as getPrice,
  img as getImg,
  variationsGrids as getVariationsGrids,
  specTextValue as getSpecTextValue,
  specValueByText as getSpecValueByText,
  formatMoney,
  $ecomConfig
} from '@ecomplus/utils'

import { store, modules } from '@ecomplus/client'
import EcomSearch from '@ecomplus/search-engine'
import ecomCart from '@ecomplus/shopping-cart'
import { isMobile } from '@ecomplus/storefront-twbs'
import lozad from 'lozad'
import sortApps from '@ecomplus/storefront-components/src/js/helpers/sort-apps'
import addIdleCallback from '@ecomplus/storefront-components/src/js/helpers/add-idle-callback'
import scrollToElement from '@ecomplus/storefront-components/src/js/helpers/scroll-to-element'
import { Portal } from '@linusborg/vue-simple-portal'
import ALink from '@ecomplus/storefront-components/src/ALink.vue'
import AAlert from '@ecomplus/storefront-components/src/AAlert.vue'
import APicture from '@ecomplus/storefront-components/src/APicture.vue'
import APrices from '@ecomplus/storefront-components/src/APrices.vue'
import AShare from '@ecomplus/storefront-components/src/AShare.vue'
import ProductVariations from '@ecomplus/storefront-components/src/ProductVariations.vue'
import ProductGallery from '@ecomplus/storefront-components/src/ProductGallery.vue'
import QuantitySelector from '@ecomplus/storefront-components/src/QuantitySelector.vue'
import ShippingCalculator from '@ecomplus/storefront-components/src/ShippingCalculator.vue'
import PaymentOption from '@ecomplus/storefront-components/src/PaymentOption.vue'
import ecomPassport from '@ecomplus/passport-client'
import { toggleFavorite, checkFavorite } from '@ecomplus/storefront-components/src/js/helpers/favorite-products'

const storefront = (typeof window === 'object' && window.storefront) || {}
const getContextBody = () => (storefront.context && storefront.context.body) || {}
const getContextId = () => getContextBody()._id

const sanitizeProductBody = body => {
  const product = Object.assign({}, body)
  delete product.body_html
  delete product.body_text
  delete product.specifications
  delete product.inventory_records
  delete product.price_change_records
  return product
}

export default {
  name: 'TheProduct',

  components: {
    Portal,
    ALink,
    AAlert,
    APicture,
    APrices,
    AShare,
    ProductVariations,
    ProductGallery,
    QuantitySelector,
    ShippingCalculator,
    PaymentOption
  },

  props: {
    productId: {
      type: String,
      default () {
        return getContextId()
      }
    },
    product: Object,
    headingTag: {
      type: String,
      default: 'h1'
    },
    buyText: String,
    galleryColClassName: {
      type: String,
      default: 'col-12 col-md-6'
    },
    hasPromotionTimer: Boolean,
    hasStickyBuyButton: {
      type: Boolean,
      default: true
    },
    hasQuantitySelector: Boolean,
    canAddToCart: {
      type: Boolean,
      default: true
    },
    hasBuyButton: {
      type: Boolean,
      default: true
    },
    lowQuantityToWarn: {
      type: Number,
      default: 12
    },
    maxVariationOptionsBtns: Number,
    isQuickview: Boolean,
    paymentAppsSort: {
      type: Array,
      default () {
        return window.ecomPaymentApps || []
      }
    },
    quoteLink: String,
    isSSR: Boolean,
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    },
    accountUrl: {
      type: String,
      default: '/app/#/account/'
    }
  },

  data () {
    return {
      body: {},
      fixedPrice: null,
      selectedVariationId: null,
      currentGalleyImg: 1,
      isOnCart: false,
      qntToBuy: 1,
      isStickyBuyVisible: false,
      isFavorite: false,
      hasClickedBuy: false,
      hasLoadError: false,
      paymentOptions: [],
      customizations: [],
      kitItems: [],
      currentTimer: null,
      variationImages: [],
      variationImagesKey: null
    }
  },

  computed: {
    i19addToFavorites: () => i18n(i19addToFavorites),
    i19close: () => i18n(i19close),
    i19days: () => i18n(i19days),
    i19discountOf: () => i18n(i19discountOf),
    i19endsIn: () => i18n(i19endsIn),
    i19freeShippingFrom: () => i18n(i19freeShippingFrom),
    i19loadProductErrorMsg: () => i18n(i19loadProductErrorMsg),
    i19offer: () => i18n(i19offer),
    i19only: () => i18n(i19only),
    i19outOfStock: () => i18n(i19outOfStock),
    i19paymentOptions: () => i18n(i19paymentOptions),
    i19perUnit: () => i18n(i19perUnit),
    i19productionDeadline: () => i18n(i19productionDeadline),
    i19removeFromFavorites: () => i18n(i19removeFromFavorites),
    i19retry: () => i18n(i19retry),
    i19selectVariationMsg: () => i18n(i19selectVariationMsg),
    i19unavailable: () => i18n(i19unavailable),
    i19quoteProduct: () => 'Cotar produto',
    i19units: () => i18n(i19units).toLowerCase(),
    i19unitsInStock: () => i18n(i19unitsInStock),
    i19workingDays: () => i18n(i19workingDays),

    selectedVariation () {
      return this.selectedVariationId
        ? this.body.variations.find(({ _id }) => _id === this.selectedVariationId)
        : {}
    },

    name () {
      return this.selectedVariation.name || getName(this.body)
    },

    isInStock () {
      return checkInStock(this.body)
    },

    isWithoutPrice () {
      return !getPrice(this.body)
    },

    isVariationInStock () {
      return checkInStock(this.selectedVariationId ? this.selectedVariation : this.body)
    },

    isLogged () {
      return ecomPassport.checkAuthorization()
    },

    thumbnail () {
      return getImg(this.body, null, 'small')
    },

    productQuantity () {
      if (this.selectedVariation.quantity) {
        return this.selectedVariation.quantity
      } else if (this.body.quantity) {
        return this.body.quantity
      }
    },

    isLowQuantity () {
      return this.productQuantity > 0 && this.lowQuantityToWarn > 0 &&
        this.productQuantity <= this.lowQuantityToWarn
    },

    strBuy () {
      return this.isSubscription ? 'ASSINAR' : this.buyText || i18n(i19buy)
    },

    discount () {
      const { body } = this
      const priceValue = this.fixedPrice || getPrice(body)
      return checkOnPromotion(body) || (body.price > priceValue)
        ? Math.round(((body.base_price - priceValue) * 100) / body.base_price)
        : 0
    },

    isOnSale () {
      const { body } = this
      return this.hasPromotionTimer &&
        checkOnPromotion(body) &&
        body.price_effective_date &&
        body.price_effective_date.end &&
        Date.now() < new Date(body.price_effective_date.end).getTime()
    },

    ghostProductForPrices () {
      const prices = {}
      ;['price', 'base_price'].forEach(field => {
        let price = this.selectedVariation[field] || this.body[field]
        if (price !== undefined) {
          this.customizations.forEach(customization => {
            if (customization.add_to_price) {
              price += this.getAdditionalPrice(customization.add_to_price)
            }
          })
        }
        prices[field] = price
      })
      const ghostProduct = { ...this.body }
      if (this.selectedVariationId) {
        Object.assign(ghostProduct, this.selectedVariation)
        delete ghostProduct.variations
      }
      return {
        ...ghostProduct,
        ...prices
      }
    },

    hasVariations () {
      return this.body.variations && this.body.variations.length
    },

    isKit () {
      return this.body.kit_composition && this.body.kit_composition.length
    },

    productToGallery () {
      if (this.variationImages.length) {
        return {
          ...this.body,
          pictures: this.variationImages.map(([url, width]) => ({
            zoom: {
              url,
              size: width ? `${width}x${width}` : undefined
            }
          }))
        }
      }
      return this.body
    },

    isEarningPoints () {
      if (this.body.categories) {
        return Boolean(this.body.categories.find(({ _id, slug }) => {
          return _id === '64c590d95e60690370785d73' || slug === 'clube-de-apoiadores'
        }))
      }
      return false
    },

    isSubscription () {
      if (this.body.categories) {
        return Boolean(this.body.categories.find(({ _id, slug }) => {
          return _id === '65301b272cd6b6595980036e' || slug === 'assinaturas'
        }))
      }
      return false
    }
  },

  methods: {
    getVariationsGrids,
    getSpecValueByText,

    setBody (data) {
      this.body = {
        ...data,
        body_html: '',
        body_text: '',
        inventory_records: []
      }
      this.sortVariationGrids()
      this.$emit('update:product', data)
    },

    sortVariationGrids () {
      if (this.body.variations) {
        this.body.variations.forEach(variation => {
          const specifications = {}
          if (variation.specifications.colors) {
            specifications.colors = variation.specifications.colors
          }
          if (variation.specifications.pauta) {
            specifications.pauta = variation.specifications.pauta
          }
          Object.keys(variation.specifications).forEach((grid) => {
            if (grid !== 'colors' && grid !== 'pauta') {
              specifications[grid] = variation.specifications[grid]
            }
          })
          variation.specifications = specifications
        })
      }
    },

    fetchProduct (isRetry = false) {
      const { productId } = this
      return store({
        url: `/products/${productId}.json`,
        axiosConfig: {
          timeout: isRetry ? 2500 : 6000
        }
      })
        .then(({ data }) => {
          this.setBody(data)
          if (getContextId() === productId) {
            storefront.context.body = this.body
          }
          this.hasLoadError = false
        })
        .catch(err => {
          console.error(err)
          const { response } = err
          if (!response || !(response.status >= 400 && response.status < 500)) {
            if (!isRetry) {
              this.fetchProduct(true)
            } else {
              this.setBody(getContextBody())
              if (!this.body.name || !this.body.price || !this.body.pictures) {
                this.hasLoadError = true
              }
            }
          }
        })
    },

    getAdditionalPrice ({ type, addition }) {
      return type === 'fixed'
        ? addition
        : getPrice(this.body) * addition / 100
    },

    formatAdditionalPrice (addToPrice) {
      if (addToPrice && addToPrice.addition) {
        return formatMoney(this.getAdditionalPrice(addToPrice))
      }
      return ''
    },

    setCustomizationOption (customization, text) {
      const index = this.customizations.findIndex(({ _id }) => _id === customization._id)
      if (text) {
        if (index > -1) {
          this.customizations[index].option = { text }
        } else {
          this.customizations.push({
            _id: customization._id,
            label: customization.label,
            add_to_price: customization.add_to_price,
            option: { text }
          })
        }
      } else if (index > -1) {
        this.customizations.splice(index, 1)
      }
    },

    showVariationPictures (variation) {
      if (this.body.categories) {
        const pattern = this.body.specifications && this.body.specifications.pattern &&
          this.body.specifications.pattern[0] && this.body.specifications.pattern[0].value
        if (pattern) {
          const isBrilliant = this.body.specifications && this.body.specifications.brilha_no_escuro &&
            this.body.specifications.brilha_no_escuro[0] &&
            this.body.specifications.brilha_no_escuro[0].value === 'sim'
          let category
          for (let i = 0; i < this.body.categories.length; i++) {
            const { slug } = this.body.categories[i]
            switch (slug) {
              case 'camisetas':
                category = 'camiseta'; break
              case 'moletons':
                category = 'moletom'; break
              case 'cadernos':
                category = 'caderno'; break
              case 'copo-bucks':
                category = 'copo-bucks'; break
              case 'quadros':
                category = 'quadro'; break
              case 'posters':
                category = 'poster'; break
              case 'placas-decorativas':
                category = 'placa-decorativa'; break
              case 'quebra-cabecas-2d':
                category = 'quebra-cabeca-2d'; break
              case 'camiseta':
              case 'moletom':
              case 'camiseta-infantil':
              case 'caderno':
              case 'copo-bucks':
              case 'quadro':
              case 'poster':
              case 'placa-decorativa':
              case 'quebra-cabeca-2d':
                category = slug
            }
          }
          if (category) {
            const { specifications } = variation
            if (specifications) {
              const color = specifications.colors && specifications.colors[0] &&
                specifications.colors[0].text && specifications.colors[0].text
                .toLowerCase()
                .replace(/ÀàÁáÂâÃã/g, 'a')
                .replace(/ÉéÊêẼẽ/g, 'e')
                .replace(/ÍíÎîĨĩ/g, 'i')
                .replace(/ÓóÔôÕõ/g, 'o')
                .replace(/Úú/g, 'u')
                .replace(/Çç/g, 'c')
                .replace(/\s/g, '-')
              const model = specifications.modelo && specifications.modelo[0] &&
                specifications.modelo[0].value
              const pauta = specifications.pauta && specifications.pauta[0] &&
                specifications.pauta[0].value
              const tampa = specifications.tampa && specifications.tampa[0] &&
                specifications.tampa[0].value
              const size = specifications.size && specifications.size[0] &&
                specifications.size[0].value
              this.variationImages = []
              switch (category) {
                case 'camiseta':
                  if (model && color) {
                    this.variationImages = [
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/${category}/${model}/${color}.jpg`, 1476],
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/arte-serigrafia-${color}.jpg`, 1200]
                    ]
                  }
                  break
                case 'moletom':
                case 'camiseta-infantil':
                  if (color) {
                    this.variationImages = [
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/${category}/${color}.jpg`, 1476],
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/arte-serigrafia-${color}.jpg`, 1200]
                    ]
                  }
                  break
                case 'caderno':
                  if (pauta) {
                    this.variationImages = [
                      [pauta !== 'sem-pauta'
                        ? `https://static.doppelstore.com.br/produtos/${category}/pauta-${pauta}.jpg`
                        : `https://static.doppelstore.com.br/produtos/${category}/sem-pauta.jpg`, 1500],
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/${category}/1.jpg`, 1500],
                      [`https://static.doppelstore.com.br/produtos/${category}/contra-capa.jpg`, 1500],
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/arte-papelaria.jpg`, 1200]
                    ]
                  }
                  break
                case 'copo-bucks':
                  if (tampa) {
                    this.variationImages = [
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/copo-bucks/${tampa}.jpg`, 1500],
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/arte-papelaria.jpg`, 1200]
                    ]
                  }
                  break
                case 'poster':
                case 'placa-decorativa':
                case 'quebra-cabeca-2d':
                case 'quadro':
                  if (size) {
                    this.variationImages = [
                      [`https://static.doppelstore.com.br/produtos/${category}/${size.replace(/-[\d]+-pcs$/, '')}.jpg`, 1200],
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/${category}/1.jpg`, 1200],
                      [`https://static.doppelstore.com.br/catalogo/${pattern}/arte-papelaria.jpg`, 1200]
                    ]
                  }
                  break
              }
              if (isBrilliant && this.variationImages.length) {
                this.variationImages.push([`https://static.doppelstore.com.br/catalogo/${pattern}/arte-brilho.jpg`, 1200])
              }
            }
          }
        }
      }
      if (variation.picture_id) {
        const pictureIndex = this.body.pictures.findIndex(({ _id }) => {
          return _id === variation.picture_id
        })
        this.currentGalleyImg = pictureIndex + 1
      }
    },

    handleGridOption ({ gridId, gridIndex, optionText }) {
      if (gridIndex === 0) {
        const variation = this.body.variations.find(variation => {
          return getSpecTextValue(variation, gridId) === optionText
        })
        if (variation) {
          this.showVariationPictures(variation)
        }
      }
    },

    toggleFavorite () {
      if (this.isLogged) {
        this.isFavorite = toggleFavorite(this.body._id, this.ecomPassport)
      }
    },

    buy () {
      this.hasClickedBuy = true
      const product = sanitizeProductBody(this.body)
      if (
        this.variationImages.length &&
        /\/(camiseta|moletom|camiseta-infantil)\//.test(this.variationImages[0][0])
      ) {
        product.pictures = this.productToGallery.pictures
      }
      let variationId
      if (this.hasVariations) {
        if (this.selectedVariationId) {
          variationId = this.selectedVariationId
        } else {
          return
        }
      }
      const customizations = [...this.customizations]
      this.$emit('buy', { product, variationId, customizations })
      if (this.canAddToCart) {
        if (this.isSubscription) {
          try {
            window.localStorage.setItem('cartItemsToRestore', JSON.stringify(ecomCart.data.items))
          } catch {
          }
          ecomCart.clear()
          ecomCart.addProduct({ ...product, customizations }, variationId, 1)
          window.location.href = `/app/#/lp/${product._id}/checkout/`
        } else {
          ecomCart.addProduct({ ...product, customizations }, variationId, this.qntToBuy)
        }
      }
      this.isOnCart = true
    },

    buyOrScroll () {
      if (this.hasVariations || this.isKit) {
        scrollToElement(this.$refs.actions)
      } else {
        this.buy()
      }
    }
  },

  watch: {
    selectedVariationId (variationId) {
      if (variationId) {
        if (this.hasClickedBuy) {
          this.hasClickedBuy = false
        }
        this.showVariationPictures(this.selectedVariation)
      }
    },

    fixedPrice (price) {
      if (price > 0 && !this.isQuickview) {
        addIdleCallback(() => {
          modules({
            url: '/list_payments.json',
            method: 'POST',
            data: {
              amount: {
                total: price
              },
              items: [{
                ...sanitizeProductBody(this.body),
                product_id: this.body._id
              }],
              currency_id: this.body.currency_id || $ecomConfig.get('currency'),
              currency_symbol: this.body.currency_symbol || $ecomConfig.get('currency_symbol')
            }
          })
            .then(({ data }) => {
              if (Array.isArray(this.paymentAppsSort) && this.paymentAppsSort.length) {
                sortApps(data.result, this.paymentAppsSort)
              }
              this.paymentOptions = data.result
                .reduce((paymentOptions, appResult) => {
                  if (appResult.validated) {
                    paymentOptions.push({
                      app_id: appResult.app_id,
                      ...appResult.response
                    })
                  }
                  return paymentOptions
                }, [])
                .sort((a, b) => {
                  return a.discount_option && a.discount_option.value &&
                    !(b.discount_option && b.discount_option.value)
                    ? -1
                    : 1
                })
            })
            .catch(console.error)
        })
      }
    },

    isKit: {
      handler (isKit) {
        if (isKit && !this.kitItems.length) {
          const kitComposition = this.body.kit_composition
          const ecomSearch = new EcomSearch()
          ecomSearch
            .removeFilter('visible')
            .setPageSize(kitComposition.length)
            .setProductIds(kitComposition.map(({ _id }) => _id))
            .fetch(true)
            .then(() => {
              ecomSearch.getItems().forEach(product => {
                const { quantity } = kitComposition.find(({ _id }) => _id === product._id)
                const addKitItem = variationId => {
                  const item = ecomCart.parseProduct(product, variationId, quantity)
                  if (quantity) {
                    item.min_quantity = item.max_quantity = quantity
                  } else {
                    item.quantity = 0
                  }
                  this.kitItems.push({
                    ...item,
                    _id: genRandomObjectId()
                  })
                }
                if (product.variations) {
                  product.variations.forEach(variation => {
                    variation._id = genRandomObjectId()
                    addKitItem(variation._id)
                  })
                } else {
                  addKitItem()
                }
              })
            })
            .catch(console.error)
        }
      },
      immediate: true
    },

    variationImages (variationImages, pastVariationImages) {
      if (variationImages.length) {
        if (pastVariationImages.length && pastVariationImages[0][0] === variationImages[0][0]) {
          return
        }
        this.variationImagesKey = Math.random().toString()
      } else {
        this.variationImagesKey = null
      }
    }
  },

  created () {
    const presetQntToBuy = () => {
      this.qntToBuy = this.body.min_quantity || 1
    }
    if (this.product) {
      this.body = this.product
      this.sortVariationGrids()
      if (this.isSSR) {
        this.fetchProduct().then(presetQntToBuy)
      } else {
        presetQntToBuy()
      }
    } else {
      this.fetchProduct().then(presetQntToBuy)
    }
    this.isFavorite = checkFavorite(this.body._id || this.productId, this.ecomPassport)
  },

  mounted () {
    if (this.$refs.sticky && !this.isWithoutPrice) {
      let isBodyPaddingSet = false
      const setStickyBuyObserver = (isToVisible = true) => {
        const $anchor = this.$refs[isToVisible ? 'sticky' : 'buy']
        if (!$anchor) {
          return
        }
        const $tmpDiv = document.createElement('div')
        $anchor.parentNode.insertBefore($tmpDiv, $anchor)
        if (isToVisible) {
          $tmpDiv.style.position = 'absolute'
          $tmpDiv.style.bottom = isMobile ? '-1600px' : '-1000px'
        }
        const obs = lozad($tmpDiv, {
          rootMargin: '100px',
          threshold: 0,
          load: () => {
            this.isStickyBuyVisible = isToVisible
            if (isToVisible && !isBodyPaddingSet) {
              this.$nextTick(() => {
                const stickyHeight = this.$refs.sticky.offsetHeight
                document.body.style.paddingBottom = `${(stickyHeight + 4)}px`
                isBodyPaddingSet = true
              })
            }
            $tmpDiv.remove()
            setTimeout(() => {
              const createObserver = function () {
                setStickyBuyObserver(!isToVisible)
                document.removeEventListener('scroll', createObserver)
              }
              document.addEventListener('scroll', createObserver)
            }, 100)
          }
        })
        obs.observe()
      }
      setStickyBuyObserver()
    }
    if (this.isOnSale) {
      const promotionDate = new Date(this.body.price_effective_date.end)
      const now = Date.now()
      if (promotionDate.getTime() > now) {
        let targetDate
        const dayMs = 24 * 60 * 60 * 1000
        const daysBetween = Math.floor((promotionDate.getTime() - now) / dayMs)
        if (daysBetween > 2) {
          targetDate = new Date()
          targetDate.setHours(23, 59, 59, 999)
        } else {
          targetDate = promotionDate
        }
        const formatTime = (number) => number < 10 ? `0${number}` : number
        const getRemainingTime = () => {
          const distance = targetDate.getTime() - Date.now()
          const days = Math.floor(distance / dayMs)
          const hours = Math.floor((distance % dayMs) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          return (days > 0 ? `${formatTime(days)}:` : '') +
            `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
        }
        this.currentTimer = setInterval(() => {
          this.$refs.timer.innerHTML = getRemainingTime()
        }, 1000)
      }
    }
  },

  destroyed () {
    if (this.currentTimer) {
      clearInterval(this.currentTimer)
    }
  }
}
