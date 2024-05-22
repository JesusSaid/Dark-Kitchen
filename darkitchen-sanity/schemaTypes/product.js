import { defineField, defineType } from "sanity";

export default defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    fields:[
        {
            name: 'titulo',
            type: 'string',
            title: 'Titulo'
        },
        {
            name: 'imagen',
            type: 'image',
            title: 'Imagen'
        },
        {
            name: 'descripcion',
            type: 'string',
            title: 'Descripcion'
        },
        {
            name: 'precio',
            type: 'number',
            title: 'Precio'
        }
    ]
})