import '#template/js/checkout'
import './custom-js/checkout'

const router1 = window.storefrontApp && window.storefrontApp.router
setInterval(function () {
  if (router1) {
    const emitCheckout1 = (name) => {
      var itembrinde = ecomCart.data.items.find(item => item.product_id === '655da25d2cd6b65959b3a3b5')
      if (itembrinde.quantity === 0) {
       window.location.href = '/app/#/cart'
       window.alert('Item brinde acabou! Você estará sendo direcionado para o carrinho em breve entrará outro brinde!')
      }
    }

    const addRoute1ToData = ({ name }) => {
      if (name === 'checkout') {
        emitCheckout1(name)
      }
    }

    if (router1.currentRoute) {
      addRoute1ToData(router1.currentRoute)
    }
    router1.afterEach(addRoute1ToData)
  }
}, 300)
