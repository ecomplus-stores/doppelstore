import getSections from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections"
import getSettings from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/settings"
import getLayout from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/layout"
import getPages from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/pages"
import getBlogPosts from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/blog-posts"
import getExtraPages from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/extra-pages"
import getWidgets from "@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/widgets"

//CUSTOM MODULES

export default options => {
  options.sections = getSections(options).concat([
    {
        label: "Compartilhar projeto",
        name: "share",
        widget: "object",
        icon: "https://api.iconify.design/bi:grid.svg",
        fields: [
            {
                label: "Link de compartilhamento",
                name: "share_link",
                widget: "string",
                required: false
            },
            {
              label: "Habilitar compartilhamento",
              name: "share_link_enable",
              widget: "boolean",
              required: false
          }
        ]
    },
    {
      label: "Lista lateral de produtos com apoio",
      name: "product_card_apoio",
      widget: "object",
      fields: [
          {
              label: "Lista de selecionáveis",
              name: "product_id_apoio",
              required: false,
              widget: "list",
              fields: [
                  {
                    label: 'Produtos',
                    name: 'products',
                    widget: 'list',
                    field: {
                      label: 'SKU do produto',
                      name: 'product_id',
                      widget: 'select',
                      options: options.state.routes
                        .filter(({ sku }) => typeof sku === 'string')
                        .map(({ _id, sku }) => ({
                          label: sku,
                          value: _id
                        }))
                    }
                  }
              ]
          }
      ]
  },
  {
    label: 'Lista de Produtos (Vitrine Personalizada)',
    name: 'product_list',
    widget: 'object',
    fields: [
      {
        label: 'Produtos',
        name: 'products',
        required: false,
        widget: 'list',
        field: {
          label: 'SKU do produto',
          name: 'product_id',
          widget: 'select',
          options: options.state.routes
            .filter(({ sku }) => typeof sku === 'string')
            .map(({ _id, sku }) => ({
              label: sku,
              value: _id
            }))
        }
      },
      {
        label: 'Título',
        required: false,
        name: 'title',
        widget: 'string'
      },
      {
        label: 'Link de destino',
        required: false,
        name: 'link',
        widget: 'string'
      }
    ]
  },
  {
    label: 'Bloco Imagem/Video e Apoio Total',
    name: 'summary_ghanor',
    widget: 'object',
    fields: [
      {
        label: "Imagem do bloco",
        name: "img",
        widget: "image",
        required: false
      },
      {
        label: "Video do bloco",
        name: "link",
        widget: "string",
        required: false
      },
      {
        label: 'Meta',
        required: false,
        name: 'meta',
        widget: 'number'
      },
      {
        label: 'Data de encerramento',
        required: false,
        name: 'end',
        widget: 'datetime',
        default: '',
        date_format: 'DD/MM/YYYY',
        time_format: 'HH:mm'
      },
      {
        label: 'Habilitar compartilhamento',
        required: false,
        name: 'enable_share',
        widget: 'boolean'
      }
    ]
  }
  ])
  console.log(options.sections)
  if (Array.isArray(options.sections) && options.sections.length && options.sections[0] && options.sections[0].name === 'responsive-banner') {
    options.sections.forEach(element => {
      if ((element.name === 'banners-grid') || (element.name === 'responsive-banner') || (element.name === 'banner-slider')) {
        element.fields.push({
          label: 'Ativar',
          hint: `Ativar grid de banners`,
          name: 'enabled',
          widget: 'boolean',
          required: false
        })
      }
      if (element.name === 'responsive-banner') {
        element.fields.push({
          label: 'Ativar Banner em tela cheia',
          name: 'full_banner_responsive',
          widget: 'boolean',
          required: false
        })
      }
    });
  }

  return {
    backend: {
      name: "git-gateway",
      branch: "master",
      commit_messages: {
        create: "Create {{collection}} “{{slug}}”",
        update: "Update {{collection}} “{{slug}}”",
        delete: "Delete {{collection}} “{{slug}}”",
        uploadMedia: "Upload “{{path}}”",
        deleteMedia: "[skip ci] Delete “{{path}}”",
        openAuthoring: "{{message}}"
      }
    },
    logo_url: "https://ecom.nyc3.digitaloceanspaces.com/storefront/cms.png",
    locale: "pt",
    load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
    media_folder: `${options.baseDir}template/public/img/uploads`,
    public_folder: "/img/uploads",
    slug: {
      encoding: "ascii",
      clean_accents: true,
      sanitize_replacement: "-"
    },
    collections: [
      getSettings(options),
      getLayout(options),
      getPages(options),
      getBlogPosts(options),
      getExtraPages(options),
      getWidgets(options),
      {
        name: 'ghanor-pages',        
        label: 'Lps ghanor',
        description: 'Configure any páginas para ghanor',
        folder: `${options.baseDir}content/ghanor`,
        extension: 'json',
        create: true,
        slug: '{{slug}}',
        fields: [
          {
            label: "Título da Página",
            name: "title",
            widget: "string"          
          }, 
          {
            label: 'Seções',
            name: 'sections',
            required: false,
            widget: 'list',
            types: [
              ...options.sections
            ]
          }
        ]
      }
    ]
  }
}
