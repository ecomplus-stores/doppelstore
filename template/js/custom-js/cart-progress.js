import ecomCart from '@ecomplus/shopping-cart'

const cartProgressConfig = window.customSettings.cart_progress_bar
if (cartProgressConfig && cartProgressConfig.value > 0) {
  if (document.getElementById('cart-progress')) {
    const {
      value: minValue,
      category_items: categoryItems,
      award_label: awardLabel,
      success_message: successMsg
    } = cartProgressConfig
    const updateCartProgress = ({ data }) => {
      if (minValue > 0) {
        const valuePercentage = Math.round(data.subtotal * 100 / minValue)
        document.getElementById('cart-progress').innerHTML = String.raw`
        <div class="cart-progress mb-3">
          <span>
            ${data.subtotal >= minValue
              ? `<span style="font-weight: 600">${successMsg}</span>`
              : `Faltam <b>R$ ${Math.round(minValue - data.subtotal)}</b> ${awardLabel.toLowerCase()}`}
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
      } else if (categoryItems && categoryItems.min_items > 0) {
        const countItems = data.items.filter((item) => {
          if (!categoryItems.category_slugs || categoryItems.category_slugs.length) {
            return true
          }
          return item.categories && item.categories.find(({ slug }) => {
            return categoryItems.category_slugs.includes(slug)
          })
        })
        const countPercentage = Math.round(countItems * 100 / categoryItems.min_items)
        document.getElementById('cart-progress').innerHTML = String.raw`
        <div class="cart-progress mb-3">
          <span>
            ${countItems >= categoryItems.min_items
              ? `<span style="font-weight: 600">${successMsg}</span>`
              : `Faltam <b>${(categoryItems.min_items - countItems)}</b> ${awardLabel.toLowerCase()}`}
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
