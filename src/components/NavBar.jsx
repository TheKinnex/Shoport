import { useLocation } from 'react-router-dom';
import logo from '../assets/img/logo.png'

const NavBar = () => {

    const styles = {
        container: 'fixed w-screen top-0 z-30',
        container__inner:  'px-8 py-4 flex items-center justify-between text-white',
        container__links: 'flex gap-12'
    }
        
        
    

    const location = useLocation();
    const {pathname} = location;

    if (pathname.includes('Producto') || pathname.includes('Catalogo')) 
        {
            styles.container__inner = 'px-8 py-4 flex items-center justify-between text-black '
        }   

    return (
        <div className={styles.container}>
            <div className={styles.container__inner}>
                <div>
                    <a href="">
                        <img src={logo} className=' w-48' alt="" />
                    </a>
                </div>
                <div className={styles.container__links}>
                    <a href="">Inicio</a>
                    <a href="">Productos</a>
                </div>
                <div className={styles.container__links}>
                    <a href="">Iniciar Sesion</a>
                    <a href="">Registrarse</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;