import ecomCart from '@ecomplus/shopping-cart'

const cartProgressConfig = window.customSettings.cart_progress_bar
if (cartProgressConfig && cartProgressConfig.value > 0) {
  if (document.getElementById('cart-progress')) {
    const {
      value: minValue,
      award_label: awardLabel,
      success_message: successMsg
    } = cartProgressConfig
    const updateCartProgress = ({ data }) => {
      const valuePercentage = Math.round(data.subtotal * 100 / minValue)
      console.log({ valuePercentage })
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
    }
    ecomCart.on('change', updateCartProgress)
    setTimeout(() => {
      const { data } = ecomCart
      updateCartProgress({ data })
    }, 1000)
  }
}
