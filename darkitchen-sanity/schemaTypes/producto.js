import { defineField, defineType } from "sanity";

export default defineType({
    name: 'producto',
    title: 'Productos',
    type: 'document',
    fields:[
        defineField({
            name: 'tipo_producto',
            type: 'reference',
            title: 'Tipo de producto',
            to: {type: 'tipo_producto'}
        }),
        defineField({
            name: 'stock',
            type: 'boolean',
            title: 'En existencia'
        }),
        defineField({
            name: 'fecha_realizacion',
            type: 'datetime',
            title: 'Fecha de realizacion'
        }),
        defineField({
            name: 'descripcion',
            type: 'string',
            title: 'Descripcion'
        })
    ]
})