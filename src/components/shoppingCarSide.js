import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from "../styles/shoppingCarSide.module.css";

const ShoppingCarSide = ({ isOpen, onClose, userId }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userId) {
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
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.precio), 0);
    setSubtotal(total);
  };

  const handleRemoveFromCart = async (productoId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const updatedCart = userDoc.data().cart.filter(item => item.productoId !== productoId);
        await setDoc(userRef, { cart: updatedCart }, { merge: true });
        setCart(updatedCart);
        toast.success("Producto eliminado del carrito");
        calculateSubtotal(updatedCart);
      } else {
        console.error("El documento del usuario no existe.");
      }
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  const handleContinueClick = async () => {
    if (!userId) {
      toast.error("No hay usuario autenticado.");
      onClose();
      navigate("/yo");
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const { address, phone } = userData;

        if (!address || !phone) {
          toast.info("Favor de ingresar su dirección y teléfono.");
          onClose();
          navigate("/yo");
          return;
        }

        // Si el subtotal es mayor a 0, mostramos el modal "Comprando"
        if (subtotal > 0) {
          setShowModal(true);
        } else {
          // De lo contrario, simplemente cerramos el carrito
          onClose();
        }
      } else {
        console.error("El documento del usuario no existe.");
      }
    } catch (error) {
      console.error("Error al verificar los datos del usuario: ", error);
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
                            {userId ? (
                              cart.map((item) => (
                                <li key={item.productoId} className="flex py-6">
                                  {/* Item details */}
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between items-center text-base font-medium text-gray-900">
                                        <h3>{item.nombre}</h3>
                                        {/* Verificar si es un pastel personalizado */}
                                        {item.detalles && item.detalles.imagen ? (
                                          <img src={item.detalles.imagen} alt={item.nombre} className={Style.imagen} />
                                        ) : (
                                          <img src={item.imagen} alt={item.nombre} className={Style.imagen} />
                                        )}
                                        <div className="flex items-center">
                                          <p className="ml-4">{item.precio}</p>
                                          <button
                                            className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                                            onClick={() => handleRemoveFromCart(item.productoId)}
                                          >
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <>
                                <li className="flex py-6">
                                  <p className="ml-4 text-gray-500">Favor de iniciar sesión</p>
                                </li>
                                <Link to="/yo" onClick={onClose} className="ml-2 text-indigo-600 hover:text-indigo-500">
                                  Ir a iniciar sesión
                                </Link>
                              </>
                            )}
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
                      <p className="text-sm text-gray-500">*Pueden agregarse costos de envío</p>
                      <div className="mt-6">
                        <button
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                          onClick={handleContinueClick}
                        >
                          Continuar
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
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
      {/* Modal "Comprando" */}
      <Transition show={showModal}>
        <Dialog className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setShowModal(false)}>
          <div className="flex items-center justify-center min-h-screen">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogPanel className="bg-white p-4 rounded-lg shadow-xl">
                <DialogTitle className="text-lg font-medium text-gray-900">Comprando</DialogTitle>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </Transition>
  )
}

export default ShoppingCarSide;
