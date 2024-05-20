import React from "react";
import { NavLink } from "react-router-dom";

export default function NacBar() {
    return (
        <header className="bg-orange-600">
            <div className="container mx-auto flex justifi-between">
                <nav className="flex">
                    <NavLink 
                        to="/" 
                        exact 
                        activeClassName="text-white"
                        className="inflex-flex items-center py-6 px-3 mr-4 text-orange-100 hover:text-green-800 text-4xl font-bold cursive tracking-widest"
                    >
                        Inicio
                    </NavLink>
                    <NavLink 
                        to="/catalogue" 
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-orange-200 hover:text-green-800"
                        activeClassName="text-orange-200 bg-orange-800"
                    >
                        Catalogo
                    </NavLink>
                    <NavLink 
                        to="/shoppingcart" 
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-orange-200 hover:text-green-800"
                        activeClassName="text-orange-200 bg-orange-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </NavLink>
                    <NavLink 
                        to="" 
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-orange-200 hover:text-green-800"
                        activeClassName="text-orange-200 bg-orange-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}