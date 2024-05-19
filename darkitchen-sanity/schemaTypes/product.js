import { defineField, defineType } from "sanity";

export default defineType({
    name: 'producto',
    title: 'Productos',
    type: 'document',
    fields:[
        {
            name: 'titulo',
            type: 'string',
            title: 'Titulo'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Imagen'
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'price',
            type: 'number',
            title: 'Precio'
        }
    ]
})