import { defineField, defineType } from "sanity";

export default defineType({
    name: 'pastel',
    title: 'Pasteles',
    type: 'document',
    fields:[
        {
            name: 'nombre',
            type: 'string',
            title: 'Nombre del pastel'
        },
        {
            name: 'sabor',
            type: 'string',
            title: 'Sabor'
        },
        {
            name: 'descripcion',
            type: 'string',
            title: 'Descripcion'
        },
        {
            name: 'precio_chico',
            type: 'number',
            title: 'Precio chico',
            validation: Rule => Rule.precision(2)
        },
        {
            name: 'precio_mediano',
            type: 'number',
            title: 'Precio mediano',
            validation: Rule => Rule.precision(2)
        },
        {
            name: 'precio_grande',
            type: 'number',
            title: 'Precio grande',
            validation: Rule => Rule.precision(2)
        },
        {
            name: 'precio_exgrande',
            type: 'number',
            title: 'Precio extra grande',
            validation: Rule => Rule.precision(2)
        },
        {
            name: 'color',
            type: 'string',
            title: 'Color'
        },
        {
            name: 'forma',
            type: 'string',
            title: 'Forma',
        }
    ]
})