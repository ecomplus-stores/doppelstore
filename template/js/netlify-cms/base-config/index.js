import getSections from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/sections'
import getSettings from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/settings'
import getLayout from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/layout'
import getPages from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/pages'
import getBlogPosts from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/blog-posts'
import getExtraPages from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/extra-pages'
import getWidgets from '@ecomplus/storefront-template/template/js/netlify-cms/base-config/collections/widgets'

export default options => {
    options.sections = getSections(options).concat([
        {
            label: 'Grid de banners bloco 2 colunas',
            name: 'banners-grid-block',
            widget: 'object',
            icon: 'https://api.iconify.design/bi:grid.svg',
            fields: [
                {
                    label: 'Banners',
                    name: 'banners',
                    widget: 'list',
                    fields: [
                        {
                            label: 'Imagem',
                            name: 'img',
                            widget: 'image',
                            media_library: {
                                config: {
                                    max_file_size: Math.max(window.CMS_MAX_FILE_SIZE || 0, 1000000)
                                }
                            }
                        },
                        {
                            label: 'Link',
                            required: false,
                            name: 'link',
                            widget: 'string'
                        },
                        {
                            label: 'Alt',
                            required: false,
                            name: 'alt',
                            widget: 'string'
                        },
                        {
                            label: 'Imagem para mobile',
                            required: false,
                            name: 'mobile_img',
                            widget: 'image',
                            media_library: {
                                config: {
                                    max_file_size: Math.max(window.CMS_MAX_FILE_SIZE || 0, 1000000)
                                }
                            }
                        },
                        {
                            name: 'width',
                            required: false,
                            widget: 'hidden'
                        },
                        {
                            name: 'height',
                            required: false,
                            widget: 'hidden'
                        }
                    ]
                },
                {
                    label: 'Ordem reversa',
                    name: 'reverse_order',
                    widget: 'boolean',
                    default: false
                }
            ]
        },
        {
            label: 'Lista de estampas',
            name: 'stamps_list',
            widget: 'object',
            fields: [
                {
                    label: 'Título da vitrine de estampas',
                    name: 'stamps_title',
                    widget: 'string',
                    required: false
                },
                {
                    label: 'Banners',
                    name: 'banners',
                    widget: 'list',
                    fields: [
                        {
                            label: 'Imagem',
                            name: 'img',
                            widget: 'image',
                            media_library: {
                                config: {
                                    max_file_size: Math.max(window.CMS_MAX_FILE_SIZE || 0, 1000000)
                                }
                            }
                        },
                        {
                            label: 'Link',
                            required: false,
                            name: 'link',
                            widget: 'string'
                        },
                        {
                            label: 'Alt',
                            required: false,
                            name: 'alt',
                            widget: 'string'
                        },
                        {
                            label: 'Imagem para mobile',
                            required: false,
                            name: 'mobile_img',
                            widget: 'image',
                            media_library: {
                                config: {
                                    max_file_size: Math.max(window.CMS_MAX_FILE_SIZE || 0, 1000000)
                                }
                            }
                        },
                        {
                            name: 'width',
                            required: false,
                            widget: 'hidden'
                        },
                        {
                            name: 'height',
                            required: false,
                            widget: 'hidden'
                        },
                        {
                            label: 'Texto customizado para estampas',
                            name: 'markdown_stamp',
                            widget: 'markdown',
                            hint: 'Markdown parseado para HTML',
                            required: false
                        }
                    ]
                }
            ]
        },
        {
            label: 'Lista de parceiros',
            name: 'partner_list',
            widget: 'object',
            fields: [
                {
                    label: 'Banners',
                    name: 'banners',
                    widget: 'list',
                    fields: [
                        {
                            label: 'Imagem',
                            name: 'img',
                            widget: 'image',
                            media_library: {
                                config: {
                                    max_file_size: Math.max(window.CMS_MAX_FILE_SIZE || 0, 1000000)
                                }
                            }
                        },
                        {
                            label: 'Link',
                            required: false,
                            name: 'link',
                            widget: 'string'
                        },
                        {
                            label: 'Alt',
                            required: false,
                            name: 'alt',
                            widget: 'string'
                        },
                        {
                            label: 'Imagem para mobile',
                            required: false,
                            name: 'mobile_img',
                            widget: 'image',
                            media_library: {
                                config: {
                                    max_file_size: Math.max(window.CMS_MAX_FILE_SIZE || 0, 1000000)
                                }
                            }
                        },
                        {
                            name: 'width',
                            required: false,
                            widget: 'hidden'
                        },
                        {
                            name: 'height',
                            required: false,
                            widget: 'hidden'
                        }
                    ]
                }
            ]
        }
    ])

    return {
        backend: {
            name: 'git-gateway',
            branch: 'master',
            commit_messages: {
                create: 'Create {{collection}} “{{slug}}”',
                update: 'Update {{collection}} “{{slug}}”',
                delete: 'Delete {{collection}} “{{slug}}”',
                uploadMedia: 'Upload “{{path}}”',
                deleteMedia: '[skip ci] Delete “{{path}}”',
                openAuthoring: '{{message}}'
            }
        },
        logo_url: 'https://ecom.nyc3.digitaloceanspaces.com/storefront/cms.png',
        locale: 'pt',
        load_config_file: Boolean(window.CMS_LOAD_CONFIG_FILE),
        media_folder: `${options.baseDir}template/public/img/uploads`,
        public_folder: '/img/uploads',
        slug: {
            encoding: 'ascii',
            clean_accents: true,
            sanitize_replacement: '-'
        },
        collections: [
            getSettings(options),
            getLayout(options),
            getPages(options),
            getBlogPosts(options),
            getExtraPages(options),
            getWidgets(options)
        ]
    }
}
