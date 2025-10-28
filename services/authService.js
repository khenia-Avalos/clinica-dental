// ¿QUÉ HACE?: Se comunica con el backend

const API_URL = 'http://localhost:3000/api/v1';// buscar en app.js de la api

// Configuración común para fetch
const fetchConfig = {
  credentials: 'include', // Importante para CORS
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const authService = {// "Voy a crear un objeto llamado 'authService' 
//  y lo voy a exportar para que otros archivos lo usen"
  async login(email, password) {// "Creo una función llamada 'login' que Recibe email y password como parámetros'async' significa: 'Espera, voy a tardar un poco'"
    try {
      const response = await fetch(`${API_URL}/auth/login`, {//se va a preguntar a la api en authroute
        method: 'POST', // "Vengo a ENVIARTE credenciales"
        headers: {
          'Content-Type': 'application/json', // "Te las envío en formato JSON"
        },
        body: JSON.stringify({ email, password }),// FETCH REQUEST Aquí están mis credenciales:"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el login');
      }

      const data = await response.json();
// "Convierte la respuesta del servidor de texto JSON a objeto JavaScript"
      
      // Guardar token y datos del usuario en localStorage
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));// "Convierte el objeto user a texto y lo guarda"
      }
      
      return data;//"Devuelve los datos al que llamó esta función"
    } catch (error) {//Si en el 'try' algo salió mal, atrapa el error aquí"
      throw error;
    }
  },

  async getProfile() {// "Creo una función llamada 'getProfile' que no recibe parámetros"
    try {
      const token = localStorage.getItem('token');// "Obtengo el token guardado en localStorage"
      
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // FETCH REQUEST "Le dice al servidor: 'Tengo permiso, aquí está mi token'"
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el perfil');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {// "Intenta hacer todo esto... si algo sale mal, voy al catch"
      const token = localStorage.getItem('token');// "Busco el token guardado en el navegador"
      
      // Solo intentar logout en servidor si tenemos token
      if (token) {
        const response = await fetch(`${API_URL}/auth/logout`, {// "Le aviso al servidor: 'Por favor, invalida este token'"
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,// "Le envío el token para que sepa QUÉ usuario hacer logout"
          },
        });

        if (!response.ok) {
          console.warn('Logout en servidor falló, pero limpiando localmente');
        }
      }

      // Limpiar localStorage siempre
      this.clearAuthData();
      
      // Redirigir
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {// "Si estoy en el navegador y NO estoy ya en la página de login"
        window.location.href = '/';
      }
      
    } catch (error) {
      console.error('Error en logout:', error);
      // Limpiar aunque falle la petición
      this.clearAuthData();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
  },

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  },

  // ✅ AGREGAR ESTA FUNCIÓN QUE FALTABA
  isAuthenticated() {
    return !!localStorage.getItem('token');// "Verifica si hay un token en localStorage"
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');//// "Si existe user en localStorage, lo convierte de texto a objeto"
  // "Si no existe, devuelve null"
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  }
};