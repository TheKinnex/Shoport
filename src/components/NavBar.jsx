import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import FavoritesDropdown from './FavoritesDropdown'; // Importa el componente DisplayFavorites

const NavBar = () => {
    const styles = {
        container: 'fixed w-full top-0 z-30',
        container__inner: 'px-4 md:px-8 py-4 flex items-center justify-between',
        container__links: 'flex gap-4 md:gap-8 items-center',
        logo: 'w-24 md:w-48',
        link: 'text-white md:text-black',
    };

    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;

    const isAuthPage = pathname.toLowerCase().includes('login') || pathname.toLowerCase().includes('register');
    const isProductPage = pathname.toLowerCase().includes('product') || pathname.toLowerCase().includes('products') || pathname.toLowerCase().includes('shoppingcart');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <div className={`${styles.container} ${isProductPage ? 'bg-white' : 'bg-transparent'}`}>
            <div className={`${styles.container__inner} ${isProductPage ? 'text-black' : 'text-white'}`}>
                <div>
                    <NavLink to="/">
                        <img src={logo} className={styles.logo} alt="Logo" />
                    </NavLink>
                </div>
                <div className="hidden md:flex gap-4 items-center">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                        Inicio
                    </NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                        Productos
                    </NavLink>
                </div>
                {!isAuthPage && (
                    <div className="flex gap-4 items-center">
                        {currentUser ? (
                            <>
                                <FavoritesDropdown isProductPage={isProductPage} />
                                <NavLink to="/ShoppingCart" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                                    Carrito
                                </NavLink>
                                <button 
                                    onClick={handleLogout} 
                                    className="font-bold text-white"
                                >
                                    <span className={`${isProductPage ? 'text-black' : 'text-white'}`}>Cerrar Sesión</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                                    Iniciar Sesión
                                </NavLink>
                                <NavLink to="/register" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                                    Registrarse
                                </NavLink>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;