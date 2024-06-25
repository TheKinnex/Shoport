import logo from '../assets/img/logo.png'
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Footer = () => {

    const styles = {
        container: 'w-full h-full bg-gray-100 px-8 py-7 relative z-20 md:bg-white',
        inner_container: 'flex flex-col md:flex-row justify-around gap-8',
        about_container: 'flex flex-col items-start md:items-start gap-y-3',
        about_text_container: 'flex flex-col gap-y-2',
        info_container: 'flex flex-col items-start md:items-start gap-y-3',
        payment_method: 'flex items-center gap-2',
    }

    const location = useLocation();
    const { pathname } = location;

    if (pathname.toLocaleLowerCase().includes('product') || pathname.toLocaleLowerCase().includes('products') || pathname.toLocaleLowerCase().includes('shoppingcart')) {
        styles.container = 'w-full h-full md:h-[33vh] bg-[#DF7D34] px-8 py-7 relative z-20 text-white font-normal';
    }

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.about_container}>
                    <img src={logo} alt="Logo" className='w-28' />
                    <div className={styles.about_text_container}>
                        <h3 className='font-medium '>Sobre Nosotros</h3>
                        <p className='w-72 text-start  md:text-left'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
                            provident fugiat corrupti eos cum voluptates sit quam culpa praesentium
                            nisi enim quas ut.
                        </p>
                    </div>
                </div>
                <div className={styles.info_container}>
                    <h3 className='font-medium'>Categorías</h3>
                    <NavLink to={"/Products/Zapatos"}>{"Zapatos"}</NavLink>
                    <NavLink to={"/Products/Camisas"}>{"Camisas"}</NavLink>
                    <NavLink to={"/Products/Short"}>{"Short"}</NavLink>
                    <NavLink to={"/Products/Accesorios"}>{"Accesorios"}</NavLink>
                </div>
                <div className={styles.info_container}>
                    <h3 className='font-medium'>Métodos de Pago</h3>
                    <p className={styles.payment_method}>
                        Paypal
                        <span><img src="/path/to/paypal-logo.png" alt="Paypal" className="w-6 h-6" /></span>
                    </p>
                    <p className={styles.payment_method}>
                        Binance
                        <span><img src="/path/to/binance-logo.png" alt="Binance" className="w-6 h-6" /></span>
                    </p>
                </div>
                <div className={styles.info_container + ' hidden md:block'}>
                    <h3 className='font-medium'>Contáctanos</h3>
                    <p>@only_v1c</p>
                    <p>@alantm12</p>
                </div>
                <div className={styles.info_container}>
                    <h3 className='font-medium text-start  md:text-left'>Designed by</h3>
                    <div className='flex gap-x-3'>
                        <p>Victor Hernandez</p>
                        <p>Alan Trasven</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;