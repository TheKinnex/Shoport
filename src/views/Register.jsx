import { useState } from "react";
import { json } from "react-router-dom";
import boton from '../assets/img/burjaboton.png';

const estilos = {
    letters: ' text-[24px] text-black'

}

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
            return "Correo no valido";
        }
        if (!phoneRegex.test(user.phone)) {
            return "Número de telefono no valido";
        }

        if (user.password.length < 6) {
            return "La contraseña debe tener minimo 6 caracteres";
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(u => u.email === user.email || u.phone === user.phone);

        if (userExists) {
            return "El correo o número de telefono estan ya se encuentran registrados en otra cuenta";
        }

        return null
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

        alert("Usuario Registrado Existosamente");
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
        <section className="flex flex-col items-center justify-center mt-20 mb-8 drop-shadow-lg ">
            <div className="border-2 rounded-xl w-[35rem] h-[48rem] pt-10 ">
            {err && <p style={{ color: 'red' }}>{err}</p>}
            <form onSubmit={handleSubmit}>
                <div className="ml-6">
                <p className={estilos.letters} >Correo Electronico</p>
                <input className="w-[32rem] h-[30px] mt-4 rounded-lg bg-slate-200" type="email" name="email" value={user.email} onChange={handleChange} placeholder="" required />
                </div>

                <div className="ml-6 mt-8">
                <p className={estilos.letters}> Nombre y Apellido</p>
                <input className="w-[14rem] h-[30px] mt-4 mr-16 rounded-lg bg-slate-200" type="text" name="name" value={user.name} onChange={handleChange} placeholder="" required />
                <input className="w-[14rem] h-[30px] mt-4 rounded-lg bg-slate-200" type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="" required />
                </div>

                <div className="ml-6 mt-8">
                <p className={estilos.letters} >Telefono y Fecha de Nacimiento</p>
                <input className="w-[14rem] h-[30px] mt-4 mr-16 rounded-lg bg-slate-200" type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="" required />
                <input className="w-[14rem] h-[30px] mt-4 rounded-lg bg-slate-200" type="date" name="birthDate" value={user.birthDate} onChange={handleChange} required />
                </div>

                <div className="ml-6 mt-8">
                <p className={estilos.letters} >Contraseña</p>
                <input className="w-[14rem] h-[30px] mt-4 rounded-lg bg-slate-200" type="password" name="password" value={user.password} onChange={handleChange} placeholder="" required />
                </div>

                <div className="mt-10 ml-6">
                <a className="text-sky-500" href="">¿Ya tienes una cuenta? Inicia Sesión</a>
                </div>

                <div className="mt-12 relative drop-shadow-lg ">
                    <img src={boton} alt="" className="w-[180px] ml-48 " />
                <button type="submit" className="absolute bottom-3 left-1/2 -translate-x-1/2 p-8 text-white font-semibold text-[18px] hover:text-black">Registrarse</button>
                </div>
                </form>
        </div>
        </section>
    )
}

export default Register;