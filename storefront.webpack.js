const path = require('path')
console.log(path.resolve(__dirname, 'template/js/custom-js/components/PaymentMethods.html'))
module.exports = () => ({
  resolve: {
    alias: {
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.html'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.js'),
      './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/components/ProductCard.js'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/components/ProductCard.html'),
      './html/EcCheckout.html': path.resolve(__dirname, 'template/js/custom-js/components/EcCheckout.html'),
      './js/EcCheckout.js': path.resolve(__dirname, 'template/js/custom-js/components/EcCheckout.js'),
      './html/EcOrderInfo.html': path.resolve(__dirname, 'template/js/custom-js/components/EcOrderInfo.html'),
      './html/AccountPoints.html': path.resolve(__dirname, 'template/js/custom-js/components/AccountPoints.html'),
      './html/PointsApplier.html': path.resolve(__dirname, 'template/js/custom-js/components/PointsApplier.html'),
      './js/PointsApplier.js': path.resolve(__dirname, 'template/js/custom-js/components/PointsApplier.js'),
      './base-config': path.resolve(__dirname, 'template/js/netlify-cms/base-config'),
      './html/CartQuickview.html': path.resolve(__dirname, 'template/js/custom-js/components/CartQuickview.html'),
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/components/APrices.html'),
      './js/APrices.js': path.resolve(__dirname, 'template/js/custom-js/components/APrices.js'),
      './js/TheCart.js': path.resolve(__dirname, 'template/js/custom-js/components/TheCart.js'),
      './js/DiscountApplier.js': path.resolve(__dirname, 'template/js/custom-js/components/DiscountApplier.js'),
    }
  }
})
