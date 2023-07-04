const path = require('path')
console.log(path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'))
module.exports = () => ({
  resolve: {
    alias: {
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.html'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/js/custom-js/components/TheProduct.js'),
      './js/ProductCard.js': path.resolve(__dirname, 'template/js/custom-js/components/ProductCard.js'),
      './html/ProductCard.html': path.resolve(__dirname, 'template/js/custom-js/components/ProductCard.html'),
      './html/EcCheckout.html': path.resolve(__dirname, 'template/js/custom-js/components/EcCheckout.html')
    }
  }
})
