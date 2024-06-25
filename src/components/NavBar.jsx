import { useLocation } from 'react-router-dom';
import logo from '../assets/img/logo.png'
import FavoritesDropwdown from './FavoritesDropdown';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const styles = {
        container: 'fixed w-screen top-0 z-30',
        container__inner: 'px-8 py-4 flex items-center justify-between',
        container__links: 'flex gap-12',
        container__links_rl: '',
        container__home: 'text-white'
    }



    const location = useLocation();
    const { pathname } = location;

    const isAuthPage = pathname.toLowerCase().includes('login') || pathname.toLowerCase().includes('register');
    const isProductPage = pathname.toLowerCase().includes('products') || pathname.toLowerCase().includes('product') || pathname.toLowerCase().includes('shoppingcart');
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
                <div className={`${styles.container__links} ${isAuthPage ? 'hidden' : ''}`}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                        Inicio
                    </NavLink>
                    <NavLink to="/Products" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                        Productos
                    </NavLink>
                </div>
                {!isAuthPage && (
                    <div className={styles.container__links}>
                        {currentUser ? (
                            <>
                                <FavoritesDropwdown/>
                                <NavLink to="/ShoppingCart" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                                    Carrito
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="font-bold text-white md:text-black"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/Login" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                                    Iniciar Sesión
                                </NavLink>
                                <NavLink to="/Register" className={({ isActive }) => isActive ? 'font-bold' : ''}>
                                    Registrarse
                                </NavLink>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );}

export default NavBar;