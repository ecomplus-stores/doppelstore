import { price as getPrice } from '@ecomplus/utils'
import ecomCart from '@ecomplus/shopping-cart'

const cartProgressConfig = window.customSettings.cart_progress_bar
if (cartProgressConfig && cartProgressConfig.value > 0) {
  if (document.getElementById('cart-progress')) {
    const {
      value: minValue,
      min_items: minItems,
      category_slugs: categorySlugs,
      award_label: awardLabel,
      success_message: successMsg
    } = cartProgressConfig
    const updateCartProgress = ({ data }) => {
      let subtotal = 0
      let numItems = 0
      data.items.forEach((item) => {
        if (categorySlugs && categorySlugs.length) {
          if (
            !item.categories ||
            !item.categories.find(({ slug }) => categorySlugs.includes(slug))
          ) {
            return
          }
        }
        subtotal += (item.quantity * getPrice(item))
        numItems += item.quantity
      })
      if (minValue > 0) {
        const valuePercentage = Math.round(subtotal * 100 / minValue)
        document.getElementById('cart-progress').innerHTML = String.raw`
        <div class="cart-progress mb-3">
          <span>
            ${subtotal >= minValue
              ? `<span style="font-weight: 600">${successMsg}</span>`
              : `Faltam <b>R$ ${Math.round(minValue - subtotal)}</b> ${awardLabel.toLowerCase()}`}
          </span>
          ${valuePercentage < 100
              ? String.raw`
              <div class="progress mt-2">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: ${valuePercentage}%"
                  aria-valuenow="${valuePercentage}"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                </div>
              </div>`
              : String.raw`
              <span class="ml-2" style="font-size: 150%; color: #61a58f">
                <i class="i-check"></i>
              </span>`}
        </div>`
      } else if (minItems > 0) {
        const countPercentage = Math.round(numItems * 100 / minItems)
        document.getElementById('cart-progress').innerHTML = String.raw`
        <div class="cart-progress mb-3">
          <span>
            ${numItems >= minItems
              ? `<span style="font-weight: 600">${successMsg}</span>`
              : `Faltam <b>${(minItems - numItems)}</b> ${awardLabel.toLowerCase()}`}
          </span>
          ${countPercentage < 100
              ? String.raw`
              <div class="progress mt-2">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: ${countPercentage}%"
                  aria-valuenow="${countPercentage}"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                </div>
              </div>`
              : String.raw`
              <span class="ml-2" style="font-size: 150%; color: #61a58f">
                <i class="i-check"></i>
              </span>`}
        </div>`
      }
    }
    ecomCart.on('change', updateCartProgress)
    setTimeout(() => {
      const { data } = ecomCart
      updateCartProgress({ data })
    }, 1000)
  }
}
