import { defineField, defineType } from "sanity";

export default defineType({
    name: 'pastel_personalizado',
    title: 'Pasteles Personalizados',
    type: 'document',
    fields:[
        {
            name: 'titulo',
            type: 'string',
            title: 'Nombre del pastel'
        },
        {
            name: 'id_pastel',
            type: 'number',
            title: 'Id Pastel',
            validation: Rule => Rule.integer().positive()
        },
        {
            name: 'descripcion',
            type: 'string',
            title: 'Descripcion'
        },
        {
            name: 'sabor',
            type: 'string',
            title: 'Sabor'
        },
        {
            name: 'tamanio',
            type: 'string',
            title: 'Tamaño'
        },
        {
            name: 'fecha_entrega',
            type: 'datetime',
            title: 'Fecha de entrega'
        },
        {
            name: 'tematica',
            type: 'string',
            title: 'Tematica'
        },
        {
            name: 'imagen_referencia',
            type: 'image',
            title: 'Imagen del pastel'
        },
        {
            name: 'color',
            type: 'string',
            title: 'Color'
        }
    ]
})