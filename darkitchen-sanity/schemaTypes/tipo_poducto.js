import { defineField, defineType } from "sanity";

export default defineType({
    name: 'tipo_producto',
    title: 'Tipos de productos',
    type: 'document',
    fields:[
        defineField({
            name: 'tipo_producto',
            type: 'number',
            title: 'Tipo de producto ID',
            validation: Rule => Rule.integer().positive()
        }),
        defineField({
            name: 'nombre',
            type: 'string',
            title: 'Nombre'
        })
    ]
})