import ecomPassport from '@ecomplus/passport-client'
import { debounce } from 'perfect-debounce'

export default (isCheckout = false) => {
  const checkDoppel = debounce(() => {
    const customerDoc = ecomPassport.getCustomer().doc_number
    if (customerDoc && customerDoc !== window.checkedDoppelDoc) {
      window.axios.get(
        `https://sistema.doppelverso.com.br/ecom/doppelgang/${customerDoc}`,
      )
        .then(({ data }) => {
          if (data.isDoppelgang) {
            window.checkedDoppelDoc = customerDoc
            window.isDoppelgang = data.isDoppelgang
            window.sessionStorage.setItem('isDoppelGang', 1)
            window.dispatchEvent(new Event('checkDoppel'))
          }
        })
        .catch(console.error)

        window.axios.get(
          `https://sistema.doppelverso.com.br/ecom/doppelgang3/${customerDoc}`,
        )
          .then(({ data }) => {
            if (data.isDoppelgang3) {
              window.checkedDoppelgang3Doc = customerDoc
              window.isDoppelgang3 = data.isDoppelgang3
              window.sessionStorage.setItem('isDoppelgang3', 1)
              window.dispatchEvent(new Event('checkDoppel'))
            }
          })
          .catch(console.error)
    }
  }, 400)
  ecomPassport.on('change', checkDoppel)
  if (ecomPassport.checkLogin()) {
    checkDoppel()
  }
}
