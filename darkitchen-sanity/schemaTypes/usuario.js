import { defineField, defineType } from "sanity";

export default defineType({
    name: 'usuario',
    title: 'Usuarios',
    type: 'document',
    fields:[
        defineField({
            name: 'nombre',
            type: 'string',
            title: 'Nombre'
        }),
        defineField({
            name: 'apellido',
            type: 'string',
            title: 'Apellido'
        }),
        defineField({
            name: 'num_celular',
            type: 'number',
            title: 'Numero de celular',
            validation: Rule => Rule.integer().positive()
        }),
        defineField({
            name: 'correo_id',
            type: 'string',
            title: 'Id correo'
        }),
        defineField({
            name: 'password',
            type: 'string',
            title: 'Password'
        }),
        defineField({
            name: 'direccion',
            type: 'reference',
            title: 'Direccion',
            to: {type: 'direccion'}
        }),
        defineField({
            name: 'tarjeta',
            type: 'reference',
            title: 'Tarjeta',
            to: {type: 'tarjeta'}
        })
    ]
})