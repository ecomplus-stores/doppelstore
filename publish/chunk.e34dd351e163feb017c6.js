/*! For license information please see chunk.e34dd351e163feb017c6.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[19,28,29,30],{228:function(t,i,e){var s=e(237);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);(0,e(157).default)("38cce0f6",s,!0,{})},229:function(t,i,e){"use strict";var s=e(17),a=e(30),o={name:"AAlert",props:{canShow:{type:Boolean,default:!0},variant:{type:String,default:"warning"}},data:()=>({count:1}),computed:{i19close:()=>Object(a.a)(s.O)},watch:{canShow(t){t&&this.count++}}},n=e(38),r=Object(n.a)(o,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("transition",{attrs:{"enter-active-class":"animated fadeInDown fast"}},[t.canShow?e("div",{key:t.count},[t._m(0)]):t._e()])],1)}),[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"alert alert-dismissible fade show",class:"alert-"+t.variant,attrs:{role:"alert"}},[t._t("default"),e("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":t.i19close},on:{click:function(i){return t.$emit("dismiss")}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])],2)}],!1,null,null,null);i.a=r.exports},230:function(t,i,e){"use strict";i.a=(t,i)=>t.sort(((t,e)=>{if(t.app_id===e.app_id)return 0;const s=i.indexOf(t.app_id),a=i.indexOf(e.app_id);return s>-1?a>-1?s<a?-1:1:s>-1?-1:1:a>-1?1:0}))},232:function(t,i,e){"use strict";e(4);var s=e(17),a=e(23),o=e(30),n=e(68),r=e(31),c=e(2),l=e(230),d=e(234),u=e.n(d),p=e(238);const h="object"==typeof window&&window.localStorage,m="shipping-to-zip",_=t=>{const i={};return["product_id","variation_id","sku","name","quantity","inventory","currency_id","currency_symbol","price","final_price","dimensions","weight"].forEach((e=>{void 0!==t[e]&&(i[e]=t[e])})),i};var y={name:"ShippingCalculator",components:{CleaveInput:u.a,ShippingLine:p.a},props:{zipCode:String,canSelectServices:Boolean,canInputZip:{type:Boolean,default:!0},countryCode:{type:String,default:a.$ecomConfig.get("country_code")},shippedItems:{type:Array,default:()=>[]},shippingResult:{type:Array,default:()=>[]},shippingData:{type:Object,default:()=>({})},skipAppIds:Array,shippingAppsSort:{type:Array,default:()=>window.ecomShippingApps||[]}},data:()=>({localZipCode:null,localShippedItems:[],amountSubtotal:null,shippingServices:[],selectedService:null,hasPaidOption:!1,freeFromValue:null,isScheduled:!1,retryTimer:null,isWaiting:!1,hasCalculated:!1}),computed:{i19add$1ToEarn:()=>Object(o.a)(s.j),i19calculateShipping:()=>Object(o.a)(s.E),i19zipCode:()=>Object(o.a)(s.ue),i19freeShipping:()=>Object(o.a)(s.Bb).toLowerCase(),cleaveOptions(){return"BR"===this.countryCode?{blocks:[5,3],delimiter:"-"}:{blocks:[30]}},freeFromPercentage(){return this.hasPaidOption&&this.amountSubtotal<this.freeFromValue?Math.round(100*this.amountSubtotal/this.freeFromValue):null},productionDeadline(){let t=0;return this.shippedItems.forEach((i=>{if(i.quantity&&i.production_time){const{days:e,cumulative:s}=i.production_time,a=s?e*i.quantity:e;a>t&&(t=a)}})),t}},methods:{formatMoney:n.a,updateZipCode(){this.$emit("update:zip-code",this.localZipCode)},parseShippingOptions(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.freeFromValue=null,this.shippingServices=[],t.length&&(t.forEach((t=>{const{validated:i,error:e,response:s}=t;if(!i||e)return;if(this.skipAppIds&&this.skipAppIds.includes(t.app_id))return;s.shipping_services.forEach((i=>{this.shippingServices.push({app_id:t.app_id,...i})}));const a=s.free_shipping_from_value;a&&(!this.freeFromValue||this.freeFromValue>a)&&(this.freeFromValue=a)})),this.shippingServices.length?(this.shippingServices=this.shippingServices.sort(((t,i)=>{const e=t.shipping_line.total_price-i.shipping_line.total_price;return e<0?-1:e>0?1:t.shipping_line.delivery_time&&i.shipping_line.delivery_time&&t.shipping_line.delivery_time.days<i.shipping_line.delivery_time.days?-1:1})),this.setSelectedService(0),this.hasPaidOption=Boolean(this.shippingServices.find((t=>t.shipping_line.total_price||t.shipping_line.price))),Array.isArray(this.shippingAppsSort)&&this.shippingAppsSort.length&&(this.shippingServices=Object(l.a)(this.shippingServices,this.shippingAppsSort))):i?this.scheduleRetry():this.fetchShippingServices(!0))},scheduleRetry(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e4;clearTimeout(this.retryTimer),this.retryTimer=setTimeout((()=>{this.localZipCode&&!this.shippingServices.length&&this.shippedItems.length&&this.fetchShippingServices(!0)}),t)},fetchShippingServices(t){this.isScheduled||(this.isScheduled=!0,setTimeout((()=>{this.isScheduled=!1;const{storeId:i}=this;let e="/calculate_shipping.json";this.skipAppIds&&this.skipAppIds.length&&(e+="?skip_ids=",this.skipAppIds.forEach(((t,i)=>{i>0&&(e+=","),e+=`${t}`})));const s={...this.shippingData,to:{zip:this.localZipCode,...this.shippingData.to}};this.localShippedItems.length&&(s.items=this.localShippedItems,s.subtotal=this.amountSubtotal),this.isWaiting=!0,Object(c.c)({url:e,method:"POST",storeId:i,data:s}).then((i=>{let{data:e}=i;return this.parseShippingOptions(e.result,t)})).catch((i=>{t||this.scheduleRetry(4e3),console.error(i)})).finally((()=>{this.hasCalculated=!0,this.isWaiting=!1}))}),this.hasCalculated?150:50))},submitZipCode(){this.updateZipCode(),h&&h.setItem(m,this.localZipCode),this.fetchShippingServices()},setSelectedService(t){this.canSelectServices&&(this.$emit("select-service",this.shippingServices[t]),this.selectedService=t)}},watch:{shippedItems:{handler(){setTimeout((()=>{this.localShippedItems=this.shippedItems.map(_);const{amountSubtotal:t}=this;this.amountSubtotal=this.shippedItems.reduce(((t,i)=>t+Object(r.a)(i)*i.quantity),0),this.hasCalculated&&(this.canSelectServices||t!==this.amountSubtotal||!this.shippingServices.length&&!this.isWaiting)&&this.fetchShippingServices()}),50)},deep:!0,immediate:!0},localZipCode(t){"BR"===this.countryCode&&8===t.replace(/\D/g,"").length&&this.submitZipCode()},zipCode:{handler(t){t&&(this.localZipCode=t)},immediate:!0},skipAppIds(){this.fetchShippingServices()},shippingResult:{handler(t){t.length&&this.parseShippingOptions(t)},immediate:!0}},created(){if(!this.zipCode&&h){const t=h.getItem(m);t&&(this.localZipCode=t)}}},f=y,g=(e(236),e(38)),b=Object(g.a)(f,(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"shipping-calculator"},[t.canInputZip?e("form",{staticClass:"shipping-calculator__form",on:{submit:function(i){return i.preventDefault(),t.submitZipCode.apply(null,arguments)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"shipping-calculator-zip"}},[t._v(" "+t._s(t.i19calculateShipping)+" ")]),e("div",{staticClass:"input-group"},[e("cleave-input",{staticClass:"form-control shipping-calculator__input",attrs:{type:"tel",id:"shipping-calculator-zip",placeholder:t.i19zipCode,"aria-label":t.i19zipCode,options:t.cleaveOptions},model:{value:t.localZipCode,callback:function(i){t.localZipCode=i},expression:"localZipCode"}}),e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"submit","aria-label":t.i19calculateShipping}},[e("i",{staticClass:"i-shipping-fast"})])])],1)])]):t._e(),e("div",{staticClass:"shipping-calculator__services"},[e("transition-group",{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated position-absolute fadeOutUp"}},[t.isWaiting?e("div",{key:"waiting",staticClass:"spinner-border spinner-border-sm",attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[t._v("Loading...")])]):e("div",{key:"services",staticClass:"list-group"},t._l(t.shippingServices,(function(i,s){return e(t.canSelectServices?"a":"div",{key:s,tag:"component",staticClass:"list-group-item",class:{"list-group-item-action":t.canSelectServices,active:t.canSelectServices&&t.selectedService===s},attrs:{href:t.canSelectServices&&"#"},on:{click:function(i){return i.preventDefault(),t.setSelectedService(s)}}},[e("span",{staticClass:"shipping-calculator__option"},[t._t("option",(function(){return[e("shipping-line",{attrs:{"shipping-line":i.shipping_line,"production-deadline":t.productionDeadline,"data-service-code":i.service_code}}),e("small",[t._v(t._s(i.label))])]}),null,{service:i})],2)])})),1)]),e("transition",{attrs:{"enter-active-class":"animated fadeInUp","leave-active-class":"animated fadeOutDown"}},[t.freeFromPercentage?e("div",{staticClass:"shipping-calculator__free-from-value"},[t._t("free-from-value",(function(){return[e("span",[t._v(" "+t._s(t.i19add$1ToEarn.replace("$1",t.formatMoney(t.freeFromValue-t.amountSubtotal)))+" "),e("strong",[t._v(t._s(t.i19freeShipping))])]),t.freeFromPercentage>=33?e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar progress-bar-striped",style:"width: "+t.freeFromPercentage+"%",attrs:{role:"progressbar","aria-valuenow":t.freeFromPercentage,"aria-valuemin":"0","aria-valuemax":"100"}},[e("span",[t._v(" "+t._s(t.i19freeShipping)+" "),e("i",{staticClass:"i-truck mx-1"}),e("strong",[t._v(t._s(t.freeFromPercentage)+"%")])])])]):t._e()]}),null,{amountSubtotal:t.amountSubtotal,freeFromValue:t.freeFromValue,freeFromPercentage:t.freeFromPercentage})],2):t._e()])],1)])}),[],!1,null,null,null);i.a=b.exports},233:function(t,i,e){"use strict";i.a=t=>{"object"==typeof window&&"function"==typeof window.requestIdleCallback?window.requestIdleCallback(t):setTimeout(t,500)}},235:function(t,i,e){"use strict";i.a=function(t){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;for(;t.offsetParent;)i+=t.offsetTop,t=t.offsetParent;return window.scroll({top:i,behavior:"smooth"})}},236:function(t,i,e){"use strict";e(228)},237:function(t,i,e){(i=e(156)(!0)).push([t.i,".shipping-calculator__input{max-width:150px}.shipping-calculator__services{font-size:var(--font-size-sm);max-width:370px}.shipping-calculator__services .active{cursor:auto}.shipping-calculator__option{display:flex;justify-content:space-between;width:100%}.shipping-calculator__option>small{min-width:70px;text-align:right}@media(min-width:1200px){.shipping-calculator__option{display:block;position:relative}.shipping-calculator__option>small{position:absolute;right:-5px;top:-5px}}.shipping-calculator__free-from-value{margin-top:var(--spacer-2)}.shipping-calculator__free-from-value .progress{height:1.5rem;margin-top:var(--spacer-1)}.shipping-calculator__free-from-value .progress-bar{background-color:var(--info)}","",{version:3,sources:["ShippingCalculator.scss"],names:[],mappings:"AAAA,4BAA4B,eAAe,CAAC,+BAA+B,6BAA6B,CAAC,eAAe,CAAC,uCAAuC,WAAW,CAAC,6BAA6B,YAAY,CAAC,6BAA6B,CAAC,UAAU,CAAC,mCAAmC,cAAc,CAAC,gBAAgB,CAAC,yBAAyB,6BAA6B,aAAa,CAAC,iBAAiB,CAAC,mCAAmC,iBAAiB,CAAC,UAAU,CAAC,QAAQ,CAAC,CAAC,sCAAsC,0BAA0B,CAAC,gDAAgD,aAAa,CAAC,0BAA0B,CAAC,oDAAoD,4BAA4B",file:"ShippingCalculator.scss",sourcesContent:[".shipping-calculator__input{max-width:150px}.shipping-calculator__services{font-size:var(--font-size-sm);max-width:370px}.shipping-calculator__services .active{cursor:auto}.shipping-calculator__option{display:flex;justify-content:space-between;width:100%}.shipping-calculator__option>small{min-width:70px;text-align:right}@media(min-width:1200px){.shipping-calculator__option{display:block;position:relative}.shipping-calculator__option>small{position:absolute;right:-5px;top:-5px}}.shipping-calculator__free-from-value{margin-top:var(--spacer-2)}.shipping-calculator__free-from-value .progress{height:1.5rem;margin-top:var(--spacer-1)}.shipping-calculator__free-from-value .progress-bar{background-color:var(--info)}"]}]),t.exports=i},246:function(t,i,e){"use strict";e(4);var s=e(17),a=e(30),o=e(20),n=e(70),r=e(31),c=e(83),l=e(32),d=e(81),u=e(80),p=e(68),h=e(35),m=e(23),_=e(87),y=e(2),f=e(48),g=e(7),b=e(0),v=e(39),C=e(230),S=e(233),A=e(235),k=e(241),O=e(174),w=e(229),I=e(176),B=e(175),x=e(252),j=e(178),P=e(253),T=e(254),V=e(232),$=e(255),q=e(25),F=e(162);const z="object"==typeof window&&window.storefront||{},E=()=>z.context&&z.context.body||{},D=()=>E()._id,L=t=>{const i=Object.assign({},t);return delete i.body_html,delete i.body_text,delete i.specifications,delete i.inventory_records,delete i.price_change_records,i};var Q={name:"TheProduct",components:{Portal:k.a,ALink:O.a,AAlert:w.a,APicture:I.a,APrices:B.a,AShare:x.a,ProductVariations:j.a,ProductGallery:P.a,QuantitySelector:T.a,ShippingCalculator:V.a,PaymentOption:$.a},props:{productId:{type:String,default:()=>D()},product:Object,headingTag:{type:String,default:"h1"},buyText:String,galleryColClassName:{type:String,default:"col-12 col-md-6"},hasPromotionTimer:Boolean,hasStickyBuyButton:{type:Boolean,default:!0},hasQuantitySelector:Boolean,canAddToCart:{type:Boolean,default:!0},hasBuyButton:{type:Boolean,default:!0},lowQuantityToWarn:{type:Number,default:12},maxVariationOptionsBtns:Number,isQuickview:Boolean,paymentAppsSort:{type:Array,default:()=>window.ecomPaymentApps||[]},quoteLink:String,isSSR:Boolean,ecomPassport:{type:Object,default:()=>q.a},accountUrl:{type:String,default:"/app/#/account/"}},data:()=>({body:{},fixedPrice:null,selectedVariationId:null,currentGalleyImg:1,isOnCart:!1,qntToBuy:1,isStickyBuyVisible:!1,isFavorite:!1,hasClickedBuy:!1,hasLoadError:!1,paymentOptions:[],customizations:[],kitItems:[],currentTimer:null,variationImages:[],variationImagesKey:null}),computed:{i19addToFavorites:()=>Object(a.a)(s.m),i19close:()=>Object(a.a)(s.O),i19days:()=>Object(a.a)(s.fb),i19discountOf:()=>Object(a.a)(s.jb),i19endsIn:()=>Object(a.a)(s.rb),i19freeShippingFrom:()=>Object(a.a)(s.Cb),i19loadProductErrorMsg:()=>Object(a.a)(s.bc),i19offer:()=>Object(a.a)(s.Fc),i19only:()=>Object(a.a)(s.Ic),i19outOfStock:()=>Object(a.a)(s.Pc),i19paymentOptions:()=>Object(a.a)(s.Tc),i19perUnit:()=>Object(a.a)(s.Uc),i19productionDeadline:()=>Object(a.a)(s.ed),i19removeFromFavorites:()=>Object(a.a)(s.sd),i19retry:()=>Object(a.a)(s.vd),i19selectVariationMsg:()=>Object(a.a)(s.Ld),i19unavailable:()=>Object(a.a)(s.ge),i19quoteProduct:()=>"Cotar produto",i19units:()=>Object(a.a)(s.he).toLowerCase(),i19unitsInStock:()=>Object(a.a)(s.ie),i19workingDays:()=>Object(a.a)(s.se),selectedVariation(){return this.selectedVariationId?this.body.variations.find((t=>{let{_id:i}=t;return i===this.selectedVariationId})):{}},name(){return this.selectedVariation.name||Object(o.a)(this.body)},isInStock(){return Object(n.a)(this.body)},isWithoutPrice(){return!Object(r.a)(this.body)},isVariationInStock(){return Object(n.a)(this.selectedVariationId?this.selectedVariation:this.body)},isLogged:()=>q.a.checkAuthorization(),thumbnail(){return Object(c.a)(this.body,null,"small")},productQuantity(){return this.selectedVariation.quantity?this.selectedVariation.quantity:this.body.quantity?this.body.quantity:void 0},isLowQuantity(){return this.productQuantity>0&&this.lowQuantityToWarn>0&&this.productQuantity<=this.lowQuantityToWarn},strBuy(){return this.buyText||Object(a.a)(s.z)},discount(){const{body:t}=this,i=this.fixedPrice||Object(r.a)(t);return Object(l.a)(t)||t.price>i?Math.round(100*(t.base_price-i)/t.base_price):0},isOnSale(){const{body:t}=this;return this.hasPromotionTimer&&Object(l.a)(t)&&t.price_effective_date&&t.price_effective_date.end&&Date.now()<new Date(t.price_effective_date.end).getTime()},ghostProductForPrices(){const t={};["price","base_price"].forEach((i=>{let e=this.selectedVariation[i]||this.body[i];void 0!==e&&this.customizations.forEach((t=>{t.add_to_price&&(e+=this.getAdditionalPrice(t.add_to_price))})),t[i]=e}));const i={...this.body};return this.selectedVariationId&&(Object.assign(i,this.selectedVariation),delete i.variations),{...i,...t}},hasVariations(){return this.body.variations&&this.body.variations.length},isKit(){return this.body.kit_composition&&this.body.kit_composition.length},productToGallery(){return this.variationImages.length?{...this.body,pictures:this.variationImages.map((t=>{let[i,e]=t;return{zoom:{url:i,size:e?`${e}x${e}`:void 0}}}))}:this.body}},methods:{getVariationsGrids:d.a,getSpecValueByText:u.a,setBody(t){this.body={...t,body_html:"",body_text:"",inventory_records:[]},this.$emit("update:product",t)},fetchProduct(){let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const{productId:i}=this;return Object(y.g)({url:`/products/${i}.json`,axiosConfig:{timeout:t?2500:6e3}}).then((t=>{let{data:e}=t;this.setBody(e),D()===i&&(z.context.body=this.body),this.hasLoadError=!1})).catch((i=>{console.error(i);const{response:e}=i;e&&e.status>=400&&e.status<500||(t?(this.setBody(E()),this.body.name&&this.body.price&&this.body.pictures||(this.hasLoadError=!0)):this.fetchProduct(!0))}))},getAdditionalPrice(t){let{type:i,addition:e}=t;return"fixed"===i?e:Object(r.a)(this.body)*e/100},formatAdditionalPrice(t){return t&&t.addition?Object(p.a)(this.getAdditionalPrice(t)):""},setCustomizationOption(t,i){const e=this.customizations.findIndex((i=>{let{_id:e}=i;return e===t._id}));i?e>-1?this.customizations[e].option={text:i}:this.customizations.push({_id:t._id,label:t.label,add_to_price:t.add_to_price,option:{text:i}}):e>-1&&this.customizations.splice(e,1)},showVariationPictures(t){if(this.body.categories){const i=this.body.specifications&&this.body.specifications.pattern&&this.body.specifications.pattern[0]&&this.body.specifications.pattern[0].value;if(i){const e=this.body.specifications&&this.body.specifications.brilha_no_escuro&&this.body.specifications.brilha_no_escuro[0]&&"sim"===this.body.specifications.brilha_no_escuro[0].value;let s=this.body.categories.find((t=>{let{slug:i}=t;return["camiseta","moletom","camiseta-infantil","caderno","copo-bucks","quadro","poster","placa-decorativa","quebra-cabeca"].includes(i)}));if(s){s=s.slug;const{specifications:a}=t;if(a){const t=a.modelo&&a.modelo[0]&&a.modelo[0].value,o=a.colors&&a.colors[0]&&a.colors[0].text&&a.colors[0].text.toLowerCase().replace(/ÀàÁáÂâÃã/g,"a").replace(/ÉéÊêẼẽ/g,"e").replace(/ÍíÎîĨĩ/g,"i").replace(/ÓóÔôÕõ/g,"o").replace(/Úú/g,"u").replace(/Çç/g,"c").replace(/\s/g,"-");switch(s){case"camiseta":case"moletom":case"camiseta-infantil":t&&o&&(this.variationImages=[[`https://static.doppelstore.com.br/catalogo/${i}/${s}/${t}/${o}.jpg`,1476],[`https://static.doppelstore.com.br/catalogo/${i}/arte-serigrafia-${o}.jpg`,1200]]);break;default:this.variationImages=[]}e&&this.variationImages.push([`https://static.doppelstore.com.br/catalogo/${i}/arte-brilho.jpg`,1200])}}}}if(t.picture_id){const i=this.body.pictures.findIndex((i=>{let{_id:e}=i;return e===t.picture_id}));this.currentGalleyImg=i+1}},handleGridOption(t){let{gridId:i,gridIndex:e,optionText:s}=t;if(0===e){const t=this.body.variations.find((t=>Object(h.a)(t,i)===s));t&&this.showVariationPictures(t)}},toggleFavorite(){this.isLogged&&(this.isFavorite=Object(F.b)(this.body._id,this.ecomPassport))},buy(){this.hasClickedBuy=!0;const t=L(this.body);let i;if(this.hasVariations){if(!this.selectedVariationId)return;i=this.selectedVariationId}const e=[...this.customizations];this.$emit("buy",{product:t,variationId:i,customizations:e}),this.canAddToCart&&g.a.addProduct({...t,customizations:e},i,this.qntToBuy),this.isOnCart=!0},buyOrScroll(){this.hasVariations||this.isKit?Object(A.a)(this.$refs.actions):this.buy()}},watch:{selectedVariationId(t){t&&(this.hasClickedBuy&&(this.hasClickedBuy=!1),this.showVariationPictures(this.selectedVariation))},fixedPrice(t){t>0&&!this.isQuickview&&Object(S.a)((()=>{Object(y.c)({url:"/list_payments.json",method:"POST",data:{amount:{total:t},items:[{...L(this.body),product_id:this.body._id}],currency_id:this.body.currency_id||m.$ecomConfig.get("currency"),currency_symbol:this.body.currency_symbol||m.$ecomConfig.get("currency_symbol")}}).then((t=>{let{data:i}=t;Array.isArray(this.paymentAppsSort)&&this.paymentAppsSort.length&&Object(C.a)(i.result,this.paymentAppsSort),this.paymentOptions=i.result.reduce(((t,i)=>(i.validated&&t.push({app_id:i.app_id,...i.response}),t)),[]).sort(((t,i)=>!t.discount_option||!t.discount_option.value||i.discount_option&&i.discount_option.value?1:-1))})).catch(console.error)}))},isKit:{handler(t){if(t&&!this.kitItems.length){const t=this.body.kit_composition,i=new f.a;i.setPageSize(t.length).setProductIds(t.map((t=>{let{_id:i}=t;return i}))).fetch(!0).then((()=>{i.getItems().forEach((i=>{const{quantity:e}=t.find((t=>{let{_id:e}=t;return e===i._id})),s=t=>{const s=g.a.parseProduct(i,t,e);e?s.min_quantity=s.max_quantity=e:s.quantity=0,this.kitItems.push({...s,_id:Object(_.a)()})};i.variations?i.variations.forEach((t=>{t._id=Object(_.a)(),s(t._id)})):s()}))})).catch(console.error)}},immediate:!0},variationImages(t){this.variationImagesKey=t.length?Math.random().toString():null}},created(){const t=()=>{this.qntToBuy=this.body.min_quantity||1};this.product?(this.body=this.product,this.isSSR?this.fetchProduct().then(t):t()):this.fetchProduct().then(t),this.isFavorite=Object(F.a)(this.body._id||this.productId,this.ecomPassport)},mounted(){var t=this;if(this.$refs.sticky&&!this.isWithoutPrice){let i=!1;const e=function(){let s=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];const a=t.$refs[s?"sticky":"buy"];if(!a)return;const o=document.createElement("div");a.parentNode.insertBefore(o,a),s&&(o.style.position="absolute",o.style.bottom=b.isMobile?"-1600px":"-1000px");Object(v.a)(o,{rootMargin:"100px",threshold:0,load:()=>{t.isStickyBuyVisible=s,s&&!i&&t.$nextTick((()=>{const e=t.$refs.sticky.offsetHeight;document.body.style.paddingBottom=`${e+4}px`,i=!0})),o.remove(),setTimeout((()=>{const t=function(){e(!s),document.removeEventListener("scroll",t)};document.addEventListener("scroll",t)}),100)}}).observe()};e()}if(this.isOnSale){const t=new Date(this.body.price_effective_date.end),i=Date.now();if(t.getTime()>i){let e;const s=864e5;Math.floor((t.getTime()-i)/s)>2?(e=new Date,e.setHours(23,59,59,999)):e=t;const a=t=>t<10?`0${t}`:t,o=()=>{const t=e.getTime()-Date.now(),i=Math.floor(t/s),o=Math.floor(t%s/36e5),n=Math.floor(t%36e5/6e4),r=Math.floor(t%6e4/1e3);return(i>0?`${a(i)}:`:"")+`${a(o)}:${a(n)}:${a(r)}`};this.currentTimer=setInterval((()=>{this.$refs.timer.innerHTML=o()}),1e3)}}},destroyed(){this.currentTimer&&clearInterval(this.currentTimer)}};i.a=Q},257:function(t,i,e){"use strict";e.d(i,"a",(function(){return s})),e.d(i,"b",(function(){return a}));var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("section",{staticClass:"product",attrs:{"data-product-id":t.body._id,"data-sku":t.body.sku,"data-selected-variation":t.selectedVariationId}},[e("a-alert",{attrs:{"can-show":t.hasLoadError,variant:"danger"}},[t._v(" "+t._s(t.i19loadProductErrorMsg)+" "),e("a",{staticClass:"alert-link",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.fetchProduct.apply(null,arguments)}}},[t._v(" "+t._s(t.i19retry)+" ")])]),e("transition",{attrs:{"enter-active-class":"animated fadeIn slower"}},[t.body._id?e("div",{staticClass:"row"},[t._t("gallery-col",(function(){return[e("div",{class:t.galleryColClassName},[e(t.isSSR?"portal":"div",{tag:"component",attrs:{selector:"#product-gallery"}},[t._t("stamps"),e("product-gallery",{key:t.variationImagesKey,attrs:{product:t.productToGallery,"can-add-to-cart":t.canAddToCart&&t.body.available&&t.isInStock,"current-slide":t.currentGalleyImg,"is-s-s-r":!t.variationImagesKey&&t.isSSR},on:{"update:currentSlide":function(i){t.currentGalleyImg=i},"update:current-slide":function(i){t.currentGalleyImg=i}}},[t._t("first-picture")],2),t._t("gallery-footer")],2)],1)]})),e("div",{ref:"actions",staticClass:"col"},[t.isSSR?t._e():t._t("heading",(function(){return[e(t.headingTag,{tag:"component",staticClass:"product__name"},[t._v(" "+t._s(t.name)+" ")]),e("p",{staticClass:"product__sku"},[t._v(" COD: "+t._s(t.body.sku)+" ")])]})),e(t.isSSR?"portal":"div",{tag:"component",attrs:{selector:"#product-actions"}},[t._t("rating",(function(){return[t._m(0)]})),t.body.available?t.isInStock?t.isWithoutPrice?e("div",{staticClass:"product__without-price"},[t._t("without-price",(function(){return[t.quoteLink?e("a",{attrs:{target:"_blank",rel:"noopener",href:t.quoteLink}},[t._v(" "+t._s(t.i19quoteProduct)+" ")]):t._e()]}))],2):[t._t("prices",(function(){return[e("p",{staticClass:"product__prices mb-4"},[e("a-prices",{attrs:{product:t.ghostProductForPrices,"is-literal":!0,"is-big":!0},on:{"fix-price":function(i){return t.fixedPrice=i}}}),t._t("discount-tag",(function(){return[t.discount>0?e("span",{staticClass:"product__discount"},[t._v(" "+t._s(t.i19discountOf)+" "),e("strong",[t._v(t._s(t.discount)+"%")])]):t._e()]}),null,{discount:t.discount})],2)]})),t.hasVariations?t._t("variations",(function(){return[e("product-variations",{attrs:{product:t.body,"selected-id":t.selectedVariationId,"max-options-btns":t.maxVariationOptionsBtns},on:{"update:selectedId":function(i){t.selectedVariationId=i},"update:selected-id":function(i){t.selectedVariationId=i},"select-option":t.handleGridOption}}),e("a-alert",{attrs:{"can-show":t.hasClickedBuy&&!t.selectedVariationId}},[t._v(" "+t._s(t.i19selectVariationMsg)+" ")]),t._t("variations-info")]})):t._e(),t.body.customizations?t._t("customizations",(function(){return t._l(t.body.customizations,(function(i){return i.custom_value?e("div",{key:i._id,staticClass:"product__customization form-group",class:i.grid_id?"product__customization--"+i.grid_id:null},[e("label",{attrs:{for:"c-"+i._id}},[t._v(" "+t._s(i.label)+" "),i.add_to_price?e("span",{staticClass:"badge badge-secondary"},[t._v(" "+t._s(t.formatAdditionalPrice(i.add_to_price))+" ")]):t._e()]),e("input",{staticClass:"form-control",attrs:{type:"text",id:"c-"+i._id},on:{keyup:function(e){return t.setCustomizationOption(i,e.target.value)}}})]):t._e()}))})):t._e(),t.isKit?e("div",{staticClass:"product__kit"},[t._t("kit",(function(){return[e("transition",{attrs:{"enter-active-class":"animated fadeInUp"}},[t.kitItems.length?e("quantity-selector",{attrs:{items:t.kitItems,min:t.body.min_quantity,max:t.body.quantity,slug:t.body.slug,"kit-product-id":t.body._id,"kit-name":t.name,"kit-price":t.fixedPrice},on:{buy:function(i){return t.$emit("buy",i)}},scopedSlots:t._u([{key:"buy-button-content",fn:function(){return[t._t("buy-button-content")]},proxy:!0}],null,!0)}):t._e()],1),t.kitItems.length?t._e():e("span",{staticClass:"product__kit-loading spinner-border",attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[t._v("Loading...")])])]}),null,{kitItems:t.kitItems})],2):[t.isVariationInStock?t.hasBuyButton?e("div",{ref:"buy",staticClass:"product__buy"},[e(t.hasQuantitySelector?"quantity-selector":"div",{tag:"component",attrs:{items:t.hasQuantitySelector?[{_id:t.body._id,quantity:t.body.min_quantity||1}]:null,min:t.body.min_quantity,max:t.body.quantity,"has-buy-button":!1},on:{"set-quantity":function(i){var e=i.quantity;return t.qntToBuy=e}}},[e("span",{on:{click:t.buy}},[t._t("buy",(function(){return[e("button",{staticClass:"btn btn-lg btn-success",attrs:{type:"button",disabled:t.hasClickedBuy&&!t.isOnCart}},[t._t("buy-button-content",(function(){return[e("i",{staticClass:"i-shopping-cart mr-1"}),t._v(" "+t._s(t.strBuy)+" ")]}))],2)]}),null,{hasClickedBuy:t.hasClickedBuy,isOnCart:t.isOnCart})],2),e("small",[t._v("* Aqui sua compra é 100% segura, compre com tranquilidade.")])])],1):t._e():e("div",{staticClass:"product__out-of-stock"},[t._t("out-of-stock",(function(){return[t._v(" "+t._s(t.i19outOfStock)+" ")]}))],2),t.isLowQuantity?e("p",{staticClass:"product__short-stock"},[e("i",{staticClass:"i-forward mr-1"}),t._v(" "+t._s(t.i19only)+" "),e("strong",[t._v(t._s(t.productQuantity))]),t._v(" "+t._s(t.i19unitsInStock)+" ")]):t._e()],t._t("sale-timer",(function(){return[t.isOnSale?e("div",{staticClass:"product__sale-timer mb-3"},[e("div",[t._v(" "+t._s(t.i19offer)+" "),e("br"),e("small",[t._v(t._s(t.i19endsIn))])]),e("div",{ref:"timer",staticClass:"h1 ml-3 mb-0"},[t._v(" 00:00:00 ")])]):t._e()]})),t._t("favorite",(function(){return[e("div",{staticClass:"text-center"},[e("a",{staticClass:"btn btn-sm product__favorite",attrs:{href:t.isLogged?null:t.accountUrl},on:{click:t.toggleFavorite}},[e("i",{staticClass:"i-heart mr-1",class:t.isFavorite?"active":null}),e("span",[t._v(" "+t._s(t.isFavorite?t.i19removeFromFavorites:t.i19addToFavorites)+" ")])])])]})),t._t("share",(function(){return[e("div",{staticClass:"text-center"},[t.body.slug?e("a-share",{staticClass:"mb-3",attrs:{url:"/"+t.body.slug,title:t.body.name,description:t.body.short_description}}):t._e()],1)]})),e("transition",{attrs:{"enter-active-class":"animated fadeInUp"}},[!t.isQuickview&&t.paymentOptions.length?t._t("payment-gateways",(function(){return[e("article",[e("div",{staticClass:"product__payment card mb-3"},[e("a",{staticClass:"card-header",attrs:{id:"product-payment-header",role:"button",href:"#product-payment","data-toggle":"collapse","aria-expanded":"false","aria-controls":"product-payment"}},[e("span",[t._v(t._s(t.i19paymentOptions))]),e("i",{staticClass:"i-chevron-down"})]),e("div",{staticClass:"collapse",attrs:{id:"product-payment","aria-labelledby":"product-payment-header"}},[e("div",{staticClass:"card-body pb-0"},t._l(t.paymentOptions,(function(i){return e("div",{key:i.app_id,staticClass:"mb-3",attrs:{id:"product-payment-"+i.app_id}},[t._t("payment-"+i.app_id,(function(){return t._l(i.payment_gateways,(function(s,a){return e("payment-option",{key:i.app_id+"-"+a,attrs:{"payment-gateway":s,"installments-option":i.installments_option,price:t.fixedPrice}})}))}))],2)})),0)])])])]}),null,{paymentOptions:t.paymentOptions}):t._e()],2),t.body.production_time&&t.body.production_time.days?e("p",{staticClass:"product__production"},[e("i",{staticClass:"i-info-circle mr-1"}),t._v(" "+t._s(t.i19productionDeadline)+": "),e("strong",[t._v(" "+t._s(t.body.production_time.days)+" "+t._s(t.body.production_time.working_days?t.i19workingDays:t.i19days)+" "),t.body.production_time.cumulative?[t._v(" "+t._s(t.i19perUnit)+" ")]:t._e()],2)]):t._e(),t.isQuickview||t.isKit&&!t.kitItems.length?t._e():t._t("shipping",(function(){return[e("div",{staticClass:"mb-2 text-xs"},[t._v(" Trabalhamos com produção sob demanda, sem estoque. Cada peça é feita uma a uma de forma sustentável, especialmente pra você. "),e("br"),t._v("Por isso, nosso prazo pode parecer longo, "),e("b",{staticClass:"d-inline-block"},[t._v("mas vale a pena!")]),t._v(" :3 ")]),e("shipping-calculator",{attrs:{shippedItems:t.isKit?t.kitItems:[Object.assign({},t.body,t.selectedVariation,{product_id:t.body._id,quantity:t.qntToBuy||t.body.min_quantity||1})]},scopedSlots:t._u([{key:"free-from-value",fn:function(i){var s=i.amountSubtotal,a=i.freeFromValue;return[e("div",{staticClass:"product__free-shipping-from"},[t._v(" "+t._s(t.i19freeShippingFrom)+" "),e("strong",[t._v(" "+t._s(Math.ceil(a/s))+" "+t._s(t.i19units)+" ")])])]}}],null,!1,3999804120)})]})),t._t("track-price",(function(){return[t._m(1)]}))]:e("div",{staticClass:"product__out-of-stock"},[t._t("out-of-stock",(function(){return[t._v(" "+t._s(t.i19outOfStock)+" ")]}))],2):e("div",{staticClass:"product__unavailable"},[t._t("unavailable",(function(){return[t._v(" "+t._s(t.i19unavailable)+" ")]}))],2)],2),!t.isSSR&&t.body.short_description?t._t("short-description",(function(){return[e("p",{staticClass:"product__info lead"},[t._v(" "+t._s(t.body.short_description)+" ")])]})):t._e()],2)],2):t._e()]),!t.isQuickview&&t.hasStickyBuyButton&&t.body.available&&t.isInStock?[e("transition",{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut fast"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isStickyBuyVisible,expression:"isStickyBuyVisible"}],ref:"sticky",staticClass:"product__sticky"},[e("div",{staticClass:"product__sticky-container container"},[e("div",{staticClass:"product__sticky-info"},[e("a-picture",{staticClass:"product__sticky-picture",attrs:{"can-calc-height":!1,src:t.thumbnail}}),e("h5",[t._v(t._s(t.name))])],1),e("div",{staticClass:"product__sticky-buy"},[e("a-prices",{attrs:{product:t.ghostProductForPrices,"is-literal":!1,"can-show-price-options":!0}}),e("a",{staticClass:"btn btn-lg btn-primary",attrs:{href:"#"},on:{click:function(i){return i.preventDefault(),t.buyOrScroll.apply(null,arguments)}}},[e("i",{staticClass:"i-shopping-bag mr-1"}),t._v(" "+t._s(t.strBuy)+" ")])],1)])])])]:t._e(),t.body._id?t._e():t._t("default")],2)},a=[function(){var t=this,i=t.$createElement;return(t._self._c||i)("div",{staticClass:"product__rating",attrs:{"data-sku":t.body.sku}})},function(){var t=this,i=t.$createElement;return(t._self._c||i)("div",{staticClass:"product__track-price",attrs:{"data-sku":t.body.sku}})}]},367:function(t,i,e){"use strict";e.r(i);var s=e(22),a=e(70),o=e(258),n=e(0);i.default=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"product";const e=document.getElementById(i);if(e){const r=document.getElementById(`${i}-dock`),c=Boolean(r),{storefront:l}=window;let d,u,p,h;l&&(d=l.getScopedSlots,u=l.context&&l.context.body,p=l.theme&&l.theme.product);const m=()=>{const t=document.getElementById("product-loading");t&&t.remove(),delete e.dataset.toRender};c&&(h=m);const{buyText:_,strHasQuantitySelector:y,strHasPromotionTimer:f,lowQuantityToWarn:g,maxVariationOptionsBtns:b,quoteInfo:v}=t,C=(t,i)=>"_"===t?Boolean(p&&p[i]):!!t&&Boolean(t.trim()),S=t=>{if(t&&-1===t.indexOf("http")){const i=t.replace(/\D/g,"");return"https://"+(n.isMobile?"api":"web")+".whatsapp.com/send?phone="+encodeURIComponent(i)+`&text=Cotar produto: ${encodeURIComponent(window.location.href)}`}return t};new s.a({render:s=>s(o.default,{attrs:{id:r?null:i},props:{...t.props,product:c&&u&&u.available&&Object(a.a)(u)?u:null,buyText:_,hasQuantitySelector:C(y,"hasQuantitySelector"),hasPromotionTimer:C(f,"hasPromotionTimer"),lowQuantityToWarn:g,maxVariationOptionsBtns:b,quoteLink:S(v),isSSR:c},on:{"update:product"(i){c||m(),t.$emit&&t.$emit("update:product",i)}},scopedSlots:Object.assign({buy:t.buy?function(){return s("span",{domProps:{innerHTML:t.buy}})}:void 0},"function"==typeof d?d(e,s,!r):{})}),mounted:h}).$mount(r||e)}}}},0,[37,38]]);
//# sourceMappingURL=chunk.e34dd351e163feb017c6.js.map