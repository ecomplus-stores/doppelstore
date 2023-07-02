// Add your custom JavaScript for storefront pages here.
import Vue from 'vue'
import AffiliateLink from './components/AffiliateLink.vue'

const affiliateLinkDiv = document.getElementById('affiliate-link')
if (affiliateLinkDiv) {
  new Vue(AffiliateLink).$mount(affiliateLinkDiv)
}

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
