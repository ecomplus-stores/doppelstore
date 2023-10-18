export default ({ baseDir, sections }) => ({
  name: 'assinatura',
  label: 'Assinatura',
  folder: `${baseDir}content/assinatura.json`,
  extension: 'json',
  fields: [
    {
      label: 'Meta title',
      name: 'meta_title',
      widget: 'string',
      hint: 'Título exibido na aba do navegador e nos resultados de motores de busca, relevante para SEO',
      required: false
    },
    {
      label: 'Meta description',
      name: 'meta_description',
      widget: 'string',
      hint: 'Descrição exibido na aba do navegador e nos resultados de motores de busca, relevante para SEO',
      required: false
    },
    {
      label: 'Seções',
      name: 'sections',
      required: false,
      hint: 'Por padrão o layout será composto por breadcrumbs, título e corpo. Pode personalizar tudo com seções de assinatura',
      widget: 'list',
      types: [
        ...sections
      ]
    }
  ]
})
