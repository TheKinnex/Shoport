import logo from '../assets/img/logo.png'
import { useLocation } from 'react-router-dom';
const Footer = () => {

    const styles = {
        container:  'w-full bg-white px-8 py-7 relative z-20',
        inner_container: 'flex justify-around',
        about_container: 'flex flex-col gap-y-3',
        about_text_container: 'pl-3 flex flex-col gap-y-2' ,
        info_container: 'flex flex-col gap-y-3',
    }

    const location = useLocation();
    const {pathname} = location;

    if (pathname.includes('Product')) 
        { console.log("si")
            styles.container = 'w-full bg-[#DF7D34] px-8 py-7 relative z-20 text-white font-normal '
        } else {console.log("no")

        }

    return (
        <div className={styles.container}>
            <div className={styles.inner_container}>
                <div className={styles.about_container}>
                    <img src={logo} alt="" className=' w-[114px]' />
                    <div className={styles.about_text_container}>
                        <h3 className='font-medium  '>Sobre Nosotros</h3>
                        <p className=' w-[300px]'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
                            provident fugiat corrupti eos cum voluptates sit quam culpa praesentium
                            nisi enim quas ut.
                        </p>
                    </div>
                </div>
                <div className={styles.info_container}>
                    <h3 className=' font-medium'>Categorias</h3>
                    <a href="">
                        Zapatos
                    </a>
                    <a href="">
                        Camisas
                    </a>
                    <a href="">
                        Accesorios
                    </a>
                    <a href="">
                        Short
                    </a>
                </div>
                <div className={styles.info_container}>
                    <h3 className=' font-medium'>Metodos de Pago</h3>
                    <p>Paypal <span><img src="" alt="" /></span></p>
                    <p>Binance <span><img src="" alt="" /></span></p>
                </div>
                <div className={styles.info_container}>
                    <h3 className=' font-medium'>Contactanos</h3>
                    <p>@only_v1c</p>
                    <p>@alantm12</p>
                </div>
                <div className={styles.info_container}>
                    <h3 className=' font-medium text-center'>Designed by</h3>
                    <div className=' flex gap-x-3'>
                        <p>@only_v1c</p>
                        <p>@alantm12</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;