import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingCart = () => {
    const [data, setData] = useState([]);
    const [productsCart, setProductsCart] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get('https://quixotic-elf-391004-default-rtdb.firebaseio.com/products.json')
            .then(res => {
                const productsList = Object.values(res.data);
                setData(productsList);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('currentUser'));
        if (storedData) {
            setCurrentUser(storedData);
            setProductsCart(storedData.cart);
            const filtered = data.filter(product => storedData.cart.includes(product.assin));
            setFilteredData(filtered);
        }
    }, [data]);

    const updateLocalStorage = (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.email === updatedUser.email);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
        } else {
            users.push(updatedUser);
        }
        localStorage.setItem('users', JSON.stringify(users));
    };

    const handleFavorite = (assin) => {
        const updatedUser = { ...currentUser };
        if (updatedUser.fav.includes(assin)) {
            updatedUser.fav = updatedUser.fav.filter(fav => fav !== assin);
        } else {
            updatedUser.fav.push(assin);
        }
        setCurrentUser(updatedUser);
        updateLocalStorage(updatedUser);
    };

    const handleRemoveFromCart = (assin) => {
        const updatedUser = { ...currentUser };
        updatedUser.cart = updatedUser.cart.filter(cartItem => cartItem !== assin);
        setProductsCart(updatedUser.cart);
        const filtered = data.filter(product => updatedUser.cart.includes(product.assin));
        setFilteredData(filtered);
        setCurrentUser(updatedUser);
        updateLocalStorage(updatedUser);
    };

    const calculateSubtotal = () => {
        return filteredData.reduce((sum, product) => sum + parseFloat(product.product_price.replace('$', '')), 0).toFixed(2);
    };

    const subtotal = calculateSubtotal();
    const shipping = 20.00;
    const total = (parseFloat(subtotal) + shipping).toFixed(2);

    return (
        <section>
            <div className="min-h-[73vh] pt-20  flex flex-col items-center p-4">
                <div className="w-full md:w-[80%] max-w-6xl flex flex-col md:flex-row gap-4">
                    <div className="flex-1 overflow-y-scroll h-[30rem]">
                        {filteredData.map((product) => (
                            <div key={product.assin} className="md:flex items-center justify-between p-4 border-b last:border-b-0 bg-white shadow rounded-lg mb-4 border-sol">
                                <div className="w-[8.25rem] h-[5.87rem] md:w-[12.25rem] flex justify-center items-center md:h-[6.87rem] bg-[#D9D9D9] pt-5 pb-2 px-3">
                                    <img
                                        className="max-w-full max-h-full object-cover"
                                        style={{ mixBlendMode: "darken" }}
                                        src={product.product_photo}
                                        alt={product.product_title}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 ml-4">
                                    <span className="font-bold flex justify-between">{product.product_title} <span className="text-lg font-bold mr-4">{product.product_price}</span></span>
                                    <div>
                                        <span className="text-sm text-gray-600 hidden md:block">{product.product_description}</span>
                                        <div className="flex gap-5">
                                            <div>
                                                <span> Talla:
                                                    <select name="Talla" id="">
                                                        <option value="">40</option>
                                                        <option value="">35</option>
                                                        <option value="">37</option>
                                                        <option value="">34</option>
                                                    </select>
                                                </span>
                                            </div>
                                            <div>
                                                <span> Cantidad:
                                                    <input type="number" min="1" className="w-12 text-center border rounded mr-2" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <button
                                            className={`text-yellow-500 hover:text-yellow-700 mr-2 ${currentUser?.fav.includes(product.assin) ? 'text-yellow-700' : 'text-yellow-500'}`}
                                            onClick={() => handleFavorite(product.assin)}
                                        >⭐</button>
                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveFromCart(product.assin)}>🗑️</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-1/2 md:w-80 bg-orange-500 text-white rounded-lg shadow p-4">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">Resumen de Compra</h2>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>{subtotal}$</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Gasto de envío</span>
                            <span>{shipping}$</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{total}$</span>
                        </div>
                        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">Pagar</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShoppingCart;