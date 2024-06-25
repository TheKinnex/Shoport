import { useState } from "react";
import boton from '../assets/img/burjaboton.png';
import { NavLink } from "react-router-dom";

const estilos = {
    letters: 'text-[16px] md:text-[24px] text-black'
};

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        birthDate: '',
        fav: [],
        cart: [],
        bills: []
    });

    const [err, setErr] = useState('');

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!emailRegex.test(user.email)) {
            return "Correo no válido";
        }
        if (!phoneRegex.test(user.phone)) {
            return "Número de teléfono no válido";
        }
        if (user.password.length < 6) {
            return "La contraseña debe tener mínimo 6 caracteres";
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(u => u.email === user.email || u.phone === user.phone);

        if (userExists) {
            return "El correo o número de teléfono ya se encuentran registrados en otra cuenta";
        }

        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errorMessage = validateForm();
        if (errorMessage) {
            setErr(errorMessage);
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        
        setUser({
            name: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            birthDate: ''
        });
        setErr('');
        
    }

    return (
        <section className="flex flex-col items-center justify-center mt-20 md:mt-36 mb-8 drop-shadow-lg px-4">
            <div className="border-2 rounded-xl w-full max-w-md md:max-w-2xl h-auto md:h-[48rem] pt-10 bg-white">
                {err && <p className="text-red-500 mb-4">{err}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 px-4">
                        <p className={estilos.letters}>Correo Electrónico</p>
                        <input
                            className="w-full h-[2.5rem] mt-2 mb-4 rounded-lg bg-slate-200 px-4"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Ingrese su correo"
                            required
                        />
                    </div>
                    <div className="mb-6 px-4">
                        <p className={estilos.letters}>Nombre y Apellido</p>
                        <div className="flex flex-col md:flex-row gap-4 mt-2">
                            <input
                                className="w-full md:w-1/2 h-[2.5rem] rounded-lg bg-slate-200 px-4"
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Nombre"
                                required
                            />
                            <input
                                className="w-full md:w-1/2 h-[2.5rem] rounded-lg bg-slate-200 px-4"
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                placeholder="Apellido"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6 px-4">
                        <p className={estilos.letters}>Teléfono y Fecha de Nacimiento</p>
                        <div className="flex flex-col md:flex-row gap-4 mt-2">
                            <input
                                className="w-full md:w-1/2 h-[2.5rem] rounded-lg bg-slate-200 px-4"
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                placeholder="Teléfono"
                                required
                            />
                            <input
                                className="w-full md:w-1/2 h-[2.5rem] rounded-lg bg-slate-200 px-4"
                                type="date"
                                name="birthDate"
                                value={user.birthDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6 px-4">
                        <p className={estilos.letters}>Contraseña</p>
                        <input
                            className="w-full h-[2.5rem] mt-2 rounded-lg bg-slate-200 px-4"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Ingrese su contraseña"
                            required
                        />
                    </div>
                    <div className="mb-6 px-4">
                        <NavLink className="text-sky-500" to={"/Login"}>{"¿Ya tienes una cuenta? Inicia Sesión"}</NavLink>
                    </div>
                    <div className="mt-12 relative drop-shadow-lg flex justify-center">
                        <img src={boton} alt="Botón" className="w-36 md:w-[180px]" />
                        <button type="submit" className="absolute bottom-4 md:bottom-3 left-1/2 transform -translate-x-1/2 p-4 md:p-8 text-white font-semibold text-[14px] md:text-[18px] hover:text-black">Registrarse</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;