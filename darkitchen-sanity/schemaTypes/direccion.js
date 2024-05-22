import { defineField, defineType } from "sanity";

export default defineType({
    name: 'direccion',
    title: 'Direcciones',
    type: 'document',
    fields:[
        defineField({
            name: 'numero_in',
            type: 'number',
            title: 'Numero interior',
            validation: Rule => Rule.integer().positive()
        }),
        defineField({
            name: 'numero_ex',
            type: 'number',
            title: 'Numero exterior',
            validation: Rule => Rule.integer().positive()
        }),
        defineField({
            name: 'nombre',
            type: 'string',
            title: 'Nombre',
            validation: Rule => Rule.required().error('El nombre es obligatorio')
        }),
        defineField({
            name: 'ciudad',
            type: 'string',
            title: 'Ciudad',
            initialValue: 'Oaxaca',
        }),
        defineField({
            name: 'municipio',
            type: 'string',
            title: 'Municipio',
            validation: Rule => Rule.required().error('El municipio es obligatorio')
        }),
        defineField({
            name: 'referencia',
            type: 'string',
            title: 'Referencia'
        }),
        defineField({
            name: 'correo_usuario',
            type: 'string',
            title: 'Correo del usuario FK'
        })
    ]
})