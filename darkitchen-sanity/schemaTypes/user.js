import { defineField, defineType } from "sanity";

export default defineType({
    name: 'usuario',
    title: 'Usuarios',
    type: 'document',
    fields:[
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'apellido',
            type: 'string',
            title: 'Apellido'
        },
        {
            name: 'correo',
            type: 'string',
            title: 'Correo Electronico'
        },
        {
            name: 'password',
            type: 'string',
            title: 'Password'
        }
    ]
})