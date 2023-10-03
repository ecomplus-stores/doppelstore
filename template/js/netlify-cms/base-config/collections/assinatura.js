export default ({ baseDir, sections }) => ({
  name: 'assinatura',
  label: 'Assinatura',
  folder: `${baseDir}content/assinatura`,
  extension: 'json',
  create: true,
  slug: '{{slug}}',
  fields: [
    {
      label: 'Seções',
      name: 'sections',
      required: false,
      hint: 'Por padrão o layout será composto por breadcrumbs, título e corpo. Pode personalizar tudo com seções de assinatura',
      widget: 'list',
      types: [
        {
          label: 'Corpo',
          name: 'blog-post',
          widget: 'object',
          fields: [
            {
              label: 'Exibir conteúdo do post',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        }
      ].concat(sections)
    }
  ]
})
