import ecomCart from '@ecomplus/shopping-cart'

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
