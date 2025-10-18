
'use client';  // ← AGREGA ESTO AL INICIO


import { useState, useEffect } from 'react';// usestate es para guardar el texto en caja
import { useRouter } from 'next/navigation';  //userouter para navegar entre paginas 
import styles from './login.module.css';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');//email es donde se guarda , setemail le da la capacidad de cambiar que tambien es un hook y usestate hace que al inicio este vacio y al escribir cambia gracias a set
  const [password, setPassword] = useState('');


  useEffect(() => {
  // Pregunta al navegador: "¿Tienes guardado 'isAuthenticated'?"
  //la variable isAuthenticated va a ser igual al VALOR que tenga guardado localStorage bajo la LLAVE 'isAuthenticated'"
   if (typeof window !== 'undefined') {  // ← ESTA LÍNEA NUEVA
 
  const estaAutenticado = localStorage.getItem('isAuthenticated');
  
  // Si encuentra 'true' significa que YA hubo un login antes
  if (estaAutenticado === 'true') {
    router.push('/dashboard'); // ¡Manda directo al dashboard!
  }
  }
}, [router]);
//Crea una constante llamada 'handleSubmit' que es igual a una función que 
// recibe un evento 'e' y ejecuta lo siguiente:"
  const handleSubmit = (e) => {
    e.preventDefault();

  // 2️⃣ VERIFICAR credenciales
  if (email === 'admin@admin.com' && password === 'password') {
    if (typeof window !== 'undefined') {  // ← ESTA LÍNEA NUEVA
    // 3️⃣ GUARDAR en memoria (si son correctas)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isAuthenticated', 'true');
    }
    // 4️⃣ REDIRIGIR al dashboard
    router.push('/dashboard');
    
  } else {
    // 5️⃣ MOSTRAR error (si son incorrectas)
    alert('Credenciales incorrectas');
  }
  
  // 6️⃣ LIMPIAR los campos (opcional)
  setEmail('');
  setPassword('');
}


return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Iniciar Sesión</h2>
      <p className={styles.subtitle}>Ingresa a tu cuenta</p>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="admin@admin.com"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="password"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
);

}