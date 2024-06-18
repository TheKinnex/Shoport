import { useState } from "react";
import { json } from "react-router-dom";

const Register = () => {

    const [user, setUser] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        birthDate: '',
        fav: []
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
        <div className="mt-72">
            <h2>Registro</h2>
            {err && <p style={{ color: 'red' }}>{err}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Nombre" required />
                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Apellido" required />
                <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Número de teléfono" required />
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Correo" required />
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Contraseña" required />
                <input type="date" name="birthDate" value={user.birthDate} onChange={handleChange} required />
                <button type="submit">Registrar</button>
            </form>
        </div>
    )
}

export default Register;