// Add your custom JavaScript for storefront pages here.
import EcomSearch from '@ecomplus/search-engine'
import Vue from 'vue'
import ecomPassport from '@ecomplus/passport-client'
import AffiliateLink from './components/AffiliateLink.vue'

const affiliateLinkDiv = document.getElementById('affiliate-link')
if (affiliateLinkDiv) {
  new Vue(AffiliateLink).$mount(affiliateLinkDiv)
}

ecomPassport.on('login', () => {
  document.getElementById('user-greetings').innerText = 'Olá, ' +
    ecomPassport.getCustomer().display_name
})
ecomPassport.on('logout', () => {
  document.getElementById('user-greetings').innerText = 'Entrar / Cadastrar'
})

const { $ } = window
$('.header__search-input').on('input', function () {
  $('.search__box.card').show()
  $('body .search__input').val($(this).val())[0].dispatchEvent(new Event('input'))
})

$('body').click((e) => {
  if ($(e.target).closest('.header__search').length === 0) {
    $('#instant-search .search__status .close').click()
  }
})

const newURL = new URLSearchParams(window.location.search)
console.log(newURL)
const isShowAll = newURL.get('show_all') || window.sessionStorage.getItem('show_all')
if (isShowAll === '59$2a82') {
  window.sessionStorage.setItem('show_all', '59$2a82')
  EcomSearch.dslMiddlewares.push((dsl) => {
    console.log('test')
    dsl.query.bool.filter.forEach(filter => {
      if (filter && filter.term) {
        filter.term = {
          visible: false
        }
      }
    })
  })
}
