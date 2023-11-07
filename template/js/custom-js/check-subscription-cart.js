import ecomCart from '@ecomplus/shopping-cart'

const { localStorage } = window

const { items } = ecomCart.data
const filterSubscriptionItems = (item) => {
  return Boolean(item.categories && item.categories
    .find(({ _id, slug }) => (_id === '65301b272cd6b6595980036e' || slug === 'assinaturas')))
}
if (items.find(filterSubscriptionItems)) {
  ecomCart.on('addItem', ({ data }) => {
    const subscriptionItems = data.items.filter(filterSubscriptionItems)
    if (subscriptionItems.length < data.items.length) {
      subscriptionItems.forEach(({ _id }) => {
        ecomCart.removeItem(_id)
      })
    }
  })
}

if (window.location.pathname.endsWith('/assinatura')) {
  const links = document.getElementsByTagName('a')
  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    if (link.href) {
      const productId = link.href.replace(/^.*\/app\/#\/([\w]+)$/, '$1')
      if (productId && productId !== link.href) {
        link.href = `/app/#/lp/${productId}/checkout/`
      }
      if (/\/app\/#\/lp\/[\w]+\//.test(link.href)) {
        link.addEventListener('click', (ev) => {
          ev.preventDefault()
          localStorage.setItem('cartItemsToRestore', JSON.stringify(ecomCart.data.items))
          window.location.href = link.href
        }, false)
      }
    }
  }
} else if (!window.location.pathname.startsWith('/app/')) {
  const itemsToRestore = localStorage.getItem('cartItemsToRestore')
  if (itemsToRestore) {
    try {
      ecomCart.data.items = JSON.parse(itemsToRestore)
      ecomCart.save()
    } catch (err) {
      console.log(err)
    }
    localStorage.removeItem('cartItemsToRestore')
  }
}
