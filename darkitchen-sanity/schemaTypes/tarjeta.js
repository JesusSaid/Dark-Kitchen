import { defineField, defineType } from "sanity";

export default defineType({
    name: 'tarjeta',
    title: 'Tarjetas',
    type: 'document',
    fields:[
        defineField({
            name: 'numero_tarjeta',
            type: 'string',
            title: 'Número de Tarjeta',
            validation: Rule => Rule.required().regex(/^\d{16}$/, {
                name: 'card number',
                invert: false
            }).error('El número de tarjeta debe ser de 16 dígitos')
        }),
        defineField({
            name: 'cvc',
            type: 'string',
            title: 'CVC',
            validation: Rule => Rule.required().regex(/^\d{3,4}$/, {
                name: 'cvc',
                invert: false
            }).error('El CVC debe ser de 3 o 4 dígitos')
        }),
        defineField({
            name: 'fecha_caducidad',
            type: 'string',
            title: 'Fecha de Caducidad',
            validation: Rule => Rule.required().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, {
                name: 'expiration date',
                invert: false
            }).error('La fecha de caducidad debe estar en formato MM/YY')
        }),
        defineField({
            name: 'nombre',
            type: 'string',
            title: 'Nombre'
        }),
        defineField({
            name: 'email',
            type: 'string',
            title: 'Correo Electrónico',
            validation: Rule => Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
                name: 'email',
                invert: false
            }).error('Debe ser un correo electrónico válido')
        })
    ]
})