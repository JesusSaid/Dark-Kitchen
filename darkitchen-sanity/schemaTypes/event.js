import { defineField, defineType } from "sanity";

export default defineType({
    name: 'evento',
    title: 'Eventos',
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
        }
    ]
})