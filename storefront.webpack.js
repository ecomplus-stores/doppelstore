const path = require('path')
console.log(path.resolve(__dirname, 'template/js/custom-js/components/PaymentMethods.html'))
module.exports = () => ({
  resolve: {
    alias: {
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.html'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.js'),
      './html/CartItem.html': path.resolve(__dirname, 'template/js/custom-js/components/CartItem.html'),
      './js/CartItem.js': path.resolve(__dirname, 'template/js/custom-js/components/CartItem.js'),
      './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/components/ProductCard.js'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/components/ProductCard.html'),
      './html/EcCheckout.html': path.resolve(__dirname, 'template/js/custom-js/components/EcCheckout.html'),
      './html/LoginModal.html': path.resolve(__dirname, 'template/js/custom-js/components/LoginModal.html'),
      './js/EcCheckout.js': path.resolve(__dirname, 'template/js/custom-js/components/EcCheckout.js'),
      './html/EcOrderInfo.html': path.resolve(__dirname, 'template/js/custom-js/components/EcOrderInfo.html'),
      './js/EcOrderInfo.js': path.resolve(__dirname, 'template/js/custom-js/components/EcOrderInfo.js'),
      './html/ShippingCalculator.html': path.resolve(__dirname, 'template/js/custom-js/components/ShippingCalculator.html'),
      './js/ShippingCalculator.js': path.resolve(__dirname, 'template/js/custom-js/components/ShippingCalculator.js'),
      './html/PaymentMethods.html': path.resolve(__dirname, 'template/js/custom-js/components/PaymentMethods.html'),
      './js/PaymentMethods.js': path.resolve(__dirname, 'template/js/custom-js/components/PaymentMethods.js'),
      './html/AccountPoints.html': path.resolve(__dirname, 'template/js/custom-js/components/AccountPoints.html'),
      './js/AccountPoints.js': path.resolve(__dirname, 'template/js/custom-js/components/AccountPoints.js'),
      './html/PointsApplier.html': path.resolve(__dirname, 'template/js/custom-js/components/PointsApplier.html'),
      './js/PointsApplier.js': path.resolve(__dirname, 'template/js/custom-js/components/PointsApplier.js'),
      './base-config': path.resolve(__dirname, 'template/js/netlify-cms/base-config'),
      './html/CartQuickview.html': path.resolve(__dirname, 'template/js/custom-js/components/CartQuickview.html'),
      './js/CartQuickview.js': path.resolve(__dirname, 'template/js/custom-js/components/CartQuickview.js'),
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/components/APrices.html'),
      './js/APrices.js': path.resolve(__dirname, 'template/js/custom-js/components/APrices.js'),
      './js/TheCart.js': path.resolve(__dirname, 'template/js/custom-js/components/TheCart.js'),
      './html/TheCart.html': path.resolve(__dirname, 'template/js/custom-js/components/TheCart.html'),
      './js/TheAccount.js': path.resolve(__dirname, 'template/js/custom-js/components/TheAccount.js'),
      //'./js/DiscountApplier.js': path.resolve(__dirname, 'template/js/custom-js/components/DiscountApplier.js'),
    }
  }
})
