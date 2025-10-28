'use client';  
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { authService } from '@/services/authService';// "Importo mi mensajero que sabe hablar con el servidor"
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();// "Tengo una caja llamada 'router' que me ayuda a navegar entre páginas"
  const [email, setEmail] = useState('');// "Tengo una caja llamada 'email' que empieza vacía"
// "setEmail es como decir: 'Cambia lo que hay en la caja email'"
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authService.isAuthenticated()) {//verifica si el usuario esta logueado
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();//"Evita que la página se recargue"
    setLoading(true);//"Activo el modo 'cargando...'"
    setError('');

    try {
      const result = await authService.login(email, password); // "Espera a que el mensajero vaya y vuelva con la respuesta"
      localStorage.setItem('userEmail', result.data.user.email);// en userEmail guarda el email de la data y este userEmail lo guarda en el localstorage
      localStorage.setItem('isAuthenticated', 'true'); // "Guardo en la memoria del navegador que estoy autenticado"
      localStorage.setItem('user', JSON.stringify(result.data.user));
      
      router.push('/dashboard'); // "Si todo sale bien, llevo al usuario al dashboard"
      
    } catch (error) {
      setError(error.message || 'Credenciales incorrectas');
      setEmail('');
      setPassword('');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Clinica Dental Especializada</h2>
        <p className={styles.subtitle}>Ingresa a tu cuenta</p>
        
        {/* Mostrar error */}
        {error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="test@ejemplo.com"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password123!"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        {/* Datos de prueba */}
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          background: '#f8f9fa', 
          borderRadius: '4px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          <strong>Datos para prueba:</strong><br/>
          Email: test@ejemplo.com<br/>
          Contraseña: Password123!
        </div>
      </div>
    </div>
  );
}