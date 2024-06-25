import { useState } from "react";
import botones from '../assets/img/burjaboton.png';
import { NavLink } from "react-router-dom";

const estilos = {
    letters: 'text-[16px] md:text-[24px] text-black'
};

const Login = () => {

    const navigate = Navigate();

    const [user, setUser] = useState({
        emailOrPhone: '',
        password: '',
    });

    const [err, setErr] = useState('');

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExist = users.find(
            u => (u.email === user.emailOrPhone || u.phone === user.emailOrPhone) && u.password === user.password
        );

        if (!userExist) {
            setErr("Correo, teléfono o contraseña son incorrectos");
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(userExist));
        alert('Inicio de sesión exitoso');
        setUser({ emailOrPhone: '', password: '' });
        setErr('');
        
    }

    return (
        <section className="flex flex-col items-center justify-center mt-20 md:mt-36 mb-8 drop-shadow-lg px-4">
            <div className="border-2 rounded-xl w-full max-w-md md:max-w-2xl h-auto md:h-[40rem] pt-12 md:pt-28 p-6 bg-white">
                {err && <p className="text-red-500 mb-4">{err}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <p className={estilos.letters}>Correo Electrónico</p>
                        <input 
                            className="w-full h-[2.5rem] mt-2 mb-8 rounded-lg bg-slate-200 px-4" 
                            type="text" 
                            name="emailOrPhone" 
                            value={user.emailOrPhone} 
                            onChange={handleChange} 
                            placeholder="Ingrese su correo o teléfono" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <p className={estilos.letters}>Contraseña</p>
                        <input 
                            className="w-full h-[2.5rem] mt-2 mb-8 rounded-lg bg-slate-200 px-4" 
                            type="password" 
                            name="password" 
                            value={user.password} 
                            onChange={handleChange} 
                            placeholder="Ingrese su contraseña" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <NavLink className="text-sky-500" to="/register">¿Todavía no tienes una cuenta? Regístrate</NavLink>
                    </div>
                    <div className="mt-12 relative drop-shadow-lg flex justify-center">
                        <img src={botones} alt="Botón" className="w-36 md:w-[180px]" />
                        <button type="submit" className="absolute bottom-[1.2rem] md:bottom-3 left-1/2 transform -translate-x-1/2 p-4 md:p-8 text-white font-semibold text-[14px] md:text-[18px] hover:text-black">Iniciar sesión</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;