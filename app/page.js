
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

  // VERIFICAR credenciales
  if (email === 'Dr@admin.com' && password === 'password') {
    if (typeof window !== 'undefined') {  // ← ESTA LÍNEA NUEVA
    //  GUARDAR en memoria (si son correctas)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isAuthenticated', 'true');
    }
    //  REDIRIGIR al dashboard
    router.push('/dashboard');
    
  } else {
    //  MOSTRAR error 
    alert('Credenciales incorrectas');
  }
  
  //  LIMPIAR los campos 
  setEmail('');
  setPassword('');
}


return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.title}>Clinica Dental Especializada</h2>
      <p className={styles.subtitle}>Ingresa a tu cuenta</p>
      
      
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"

            /*Este campo es para emails"*/
            value={email}

            /*"Lo que muestres en pantalla debe ser igual a lo que guarda la variable email"*/
            onChange={(e) => setEmail(e.target.value)}
           
           /*Cada vez que el usuario escribe algo en el input, toma exactamente lo que escribió y guárdalo en la variable email"


            /*, extrae el valor escrito (e.target.value) y actualiza el estado email con ese valor usando setEmail.*/
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