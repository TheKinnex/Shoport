import { useState } from "react";
import botones from '../assets/img/burjaboton.png';
import { NavLink } from "react-router-dom";

const estilos = {
    letters: ' text-[24px] text-black'

}

const Login = () => {

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
        )

        if (!userExist) {
            setErr("Correo, telefono o contraseña son incorrectos");
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(userExist));
        alert('Inicio de sesion exitoso');
        setUser({ emailOrPhone: '', password: ''});
        setErr('');

    }


    return (
<section className="flex flex-col items-center justify-center mt-36 mb-8 drop-shadow-lg">
<div class=" border-2 rounded-xl w-[35rem] h-[40rem] pt-28 ">
    {err && <p style={{ color: 'red' }}>{err}</p>}
    <form onSubmit={handleSubmit}>

    <div className="ml-6">
        <p className={estilos.letters} >Correo Electronico</p>
    <input className="w-[32rem] h-[30px] mt-4 mb-12 rounded-lg bg-slate-200" type="text" name="emailOrPhone" value={user.emailOrPhone} onChange={handleChange} placeholder="" required />
    </div>

    <div className="ml-6">
        <p className={estilos.letters}>Contraseña</p>
    <input className="w-[32rem] h-[30px] mt-4 rounded-lg bg-slate-200" type="password" name="password" value={user.password} onChange={handleChange} placeholder="" required />
    </div>

    <div className="mt-10 ml-6">
        <NavLink className="text-sky-500" to={"/register"}>{"Todavia no tienes una cuenta? Registrate"}</NavLink>
    </div>

    <div className="mt-12 relative drop-shadow-lg">
    <img src={botones} alt="" className="w-[180px] ml-48" />
    <button type="submit" className="absolute bottom-3 left-1/2 -translate-x-1/2 p-8 text-white font-semibold text-[18px] hover:text-black">Iniciar sesión</button>
    </div>
    </form>
</div>
</section>
    );
}

export default Login;