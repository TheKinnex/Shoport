import { useState } from "react";

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
        <div className="mt-72">
            <h2>Login</h2>
            {err && <p style={{ color: 'red' }}>{err}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="emailOrPhone" value={user.emailOrPhone} onChange={handleChange} placeholder="Correo o Numero de telefono" required />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Contraseña" required />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;