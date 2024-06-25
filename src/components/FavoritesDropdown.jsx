import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const FavoritesDropwdown = () => {
    const [favorites, setFavorites] = useState([])


    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.fav) {

            axios.get('https://quixotic-elf-391004-default-rtdb.firebaseio.com/products.json')
                .then(response => {
                    const allProducts = Object.values(response.data);
                    const favoriteProducts = allProducts.filter(product => currentUser.fav.includes(product.assin));
                    setFavorites(favoriteProducts);
                })
                .catch(error => console.error(error));
        }
    }, []);

    const toggleDropdown = () => { setIsOpen(!isOpen) }

    return (
        <div className="relative">
        <button
            onClick={toggleDropdown}
            className="font-bold text-white md:text-black hover:text-gray-700"
        >
            Favoritos
        </button>
        {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
            {favorites.length > 0 ? (
                <ul>
                {favorites.map((product) => (
                    <li key={product.assin} className="px-4 py-2 border-b last:border-b-0">
                    <NavLink to={`/product/${product.assin}`} className="flex items-center">
                        <img
                        src={product.product_photo}
                        alt={product.product_title}
                        className="w-10 h-10 mr-2"
                        />
                        <span>{product.product_title}</span>
                    </NavLink>
                    </li>
                ))}
                </ul>
            ) : (
                <div className="px-4 py-2">
                <p>No tienes productos favoritos.</p>
                </div>
            )}
            </div>
        )}
        </div>
    );
    }

export default FavoritesDropwdown;















