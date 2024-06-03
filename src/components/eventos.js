import React from 'react'
const features = [
    { name: 'Sabores tradicionales', description: 'Contamos con una gran variedad de sabores tradicionales como, tejate, maiz entre otros' },
    { name: 'Postres', description: 'Postres para mejorar el sabor de tu evento especial' },
    { name: 'Pasteles', description: 'Pasteles totalmente personalizados para tu boda"' },
    { name: 'Mesas de dulces', description: 'Hand sanded and finished with natural oil' },
    { name: 'Catering para Eventos', description: 'Servicio completo de catering con menús personalizados que incluyen postres y pasteles, asegurando que cada detalle de tu evento sea perfecto.' },
    { name: 'Degustaciones Privadas', description: 'Organizamos sesiones de degustación privadas para que puedas probar y elegir los sabores perfectos para tu evento especial.' }

  ]
  
const Eventos = () => {
    return (
        <div className="bg-white">  
        <div className="mx-auto grid max-w-2x2 grid-cols-1 items-center  gap-y-16 px-10 py-10 sm:px-4 sm:py-12 lg:max-w-7x3 lg:grid-cols-2 lg:px-10">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestros eventos</h2>
            <p className="mt-4 text-gray-500">
              Contamos con servicio de banquetes, mesas de dulces, somos tu opcion perfecta para fiestas, bodas, cumpleanios etc.
            </p>
  
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6  lg:gap-8">
            <img
              src="https://oasisfloral.mx/cdn/shop/articles/pastel_con_flores_2_900x.png?v=1605047396"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://cdn0.bodas.com.mx/article-real-wedding-o/1879/3_2/1280/jpg/5_349781.webp"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://cdn0.bodas.com.mx/article-real-wedding-o/6551/original/960/jpg/5_161556.webp"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="https://cdn0.bodas.com.mx/article-real-wedding-o/5565/original/960/jpg/5_375655.webp"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
          
        </div>
        
      </div>
      
    )
}

export default Eventos
