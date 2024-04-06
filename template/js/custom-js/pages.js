// Add your custom JavaScript for storefront pages here.
import EcomSearch from '@ecomplus/search-engine'
import Vue from 'vue'
import ecomPassport from '@ecomplus/passport-client'
import AffiliateLink from './components/AffiliateLink.vue'
import GhanorSummary from './components/GhanorSummary.vue'
import './cart-progress'
import './check-subscription-cart'

const affiliateLinkDiv = document.getElementById('affiliate-link')
if (affiliateLinkDiv) {
  new Vue(AffiliateLink).$mount(affiliateLinkDiv)
}

import checkDoppel from './check-doppel'
import igor1523 from './igor1523'
checkDoppel()

/* const ghanorDiv = document.getElementById('ghanor-block')
if (ghanorDiv) {
  new Vue(GhanorSummary).$mount(ghanorDiv)
} */

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
const isShowAll = newURL.get('show_all') || window.sessionStorage.getItem('show_all')
if (isShowAll === '59$2a82') {
  window.sessionStorage.setItem('show_all', '59$2a82')
  EcomSearch.dslMiddlewares.push((dsl) => {
    dsl.query.bool.filter.forEach(filter => {
      if (filter && filter.term) {
        filter.term = {
          visible: false
        }
      }
    })
  })
}
const isDoppelgang2 = window.isDoppelgang2 || window.sessionStorage.getItem('isDoppelgang2')
if (window.isDoppelgangCategory && !isDoppelgang2) {
  window.location = 'https://links.doppelstore.com.br/492GOrS'
}

const isDoppelgang3 = window.isDoppelgang3 || window.sessionStorage.getItem('isDoppelgang3')

if (window.isDoppelgang3Category && !isDoppelgang3) {
  window.location = 'https://links.doppelstore.com.br/492GOrS'
}

