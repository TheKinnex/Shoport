import logo from '../assets/img/logo.png'

const Footer = () => {
    return (
        <div className=' w-full bg-white px-8 py-7 relative z-20'>
            <div className=' flex justify-around'>
                <div className=' flex flex-col gap-y-3'>
                    <img src={logo} alt="" className=' w-[114px]' />
                    <div className='pl-3 flex flex-col gap-y-2'>
                        <h3 className='font-medium  '>Sobre Nosotros</h3>
                        <p className=' w-[300px]'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
                            provident fugiat corrupti eos cum voluptates sit quam culpa praesentium
                            nisi enim quas ut.
                        </p>
                    </div>
                </div>
                <div className=' flex flex-col gap-y-3'>
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
                <div className='flex flex-col gap-y-3'>
                    <h3 className=' font-medium'>Metodos de Pago</h3>
                    <p>Paypal <span><img src="" alt="" /></span></p>
                    <p>Binance <span><img src="" alt="" /></span></p>
                </div>
                <div className='flex flex-col gap-y-3'>
                    <h3 className=' font-medium'>Contactanos</h3>
                    <p>@only_v1c</p>
                    <p>@alantm12</p>
                </div>
                <div className='flex flex-col gap-y-3'>
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