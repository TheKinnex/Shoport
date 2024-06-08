import logo from '../assets/img/logo-nav.png'

const NavBar = () => {
    return (
        <div className=' fixed w-full top-0 z-20'>
            <div className=' px-8 py-4 flex items-center justify-between text-white'>
                <div>
                    <a href="">
                        <img src={logo} className=' w-48' alt="" />
                    </a>
                </div>
                <div className=' flex gap-12'>
                    <a href="">Inicio</a>
                    <a href="">Productos</a>
                </div>
                <div className='flex gap-12 '>
                    <a href="">Iniciar Sesion</a>
                    <a href="">Registrarse</a>
                </div>
            </div>
        </div>
    );
}

export default NavBar;