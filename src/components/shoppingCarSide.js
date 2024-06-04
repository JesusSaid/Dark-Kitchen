import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ShoppingCarSide = ({ isOpen, onClose, userId }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) {
          console.error("El userId es undefined");
          return;
        }
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          const cartData = userDoc.data().cart || [];
          setCart(cartData);
          calculateSubtotal(cartData); // Calcular subtotal cuando cambia el carrito
        } else {
          console.error("El documento del usuario no existe.");
        }
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    };

    fetchCart();
  }, [isOpen, userId]);

// Función para calcular el subtotal
const calculateSubtotal = (cartItems) => {
  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
  setSubtotal(total);
};

const handleRemoveFromCart = async (productId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const updatedCart = userDoc.data().cart.filter(item => item.productId !== productId);
      await setDoc(userRef, { cart: updatedCart }, { merge: true });
      setCart(updatedCart);
      calculateSubtotal(updatedCart);
    } else {
      console.error("El documento del usuario no existe.");
    }
  } catch (error) {
    console.error("Error removing item from cart: ", error);
  }
};


  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-10" onClose={onClose}>
        {/* Transition backdrop */}
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        {/* Dialog content */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {/* Dialog panel */}
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Panel header */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">Carrito de compra</DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Cerrar panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Cart items */}
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((item) => (
                              <li key={item.productId} className="flex py-6">
                                {/* Item details */}
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.name}</h3>
                                      <div className="flex items-center">
                                        <p className="ml-4">{item.price}</p>
                                        <button
                                          className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                                          onClick={() => handleRemoveFromCart(item.productId)}
                                        >
                                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Panel footer */}
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p> {/* Mostrar el subtotal */}
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Carrito de compras</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Continuar
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          o{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={onClose}
                          >
                            Continuar comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ShoppingCarSide;
