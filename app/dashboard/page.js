'use client';
import { useEffect, useState } from 'react'; // useState = "Necesito recordar datos del usuario"
import { useRouter } from 'next/navigation';// useRouter = "Para poder redirigir al usuario"
import { authService } from '@/services/authService';

export default function Dashboard() {
    const [userEmail, setUserEmail] = useState('');
    const [userData, setUserData] = useState(null);// "userData = Donde guardo TODOS los datos del usuario (nombre, teléfono, etc)"
    const [loading, setLoading] = useState(true); // ✅ Agregado el estado loading que faltaba
    const router = useRouter();

    useEffect(() => {  // "Cuando el Dashboard se carga, hago esto:"
        
        const isAuthenticated = authService.isAuthenticated(); // "Pregunto: ¿El usuario tiene token válido?"
        const user = authService.getCurrentUser();  // "Recupero los datos del usuario guardados"
        
        if (!isAuthenticated || !user) {
         router.push('/'); // de regreso al login si no
            return;
        }
        
        setUserEmail(user.email);
        setUserData(user);// "Guardo todos los datos del usuario"
        setLoading(false); // ✅ Desactivar loading cuando todo esté listo
    }, [router]);/// "Ejecuta esto cada vez que 'router' cambie"

    const handleLogout = () => {
        authService.logout(); // Usar el servicio de logout
        // El servicio ya maneja la redirección
    };

   
      
    if (loading) { // ✅ Verificar loading en lugar de userEmail
        //porque Falla si: El usuario tiene email guardado pero el token expiró.
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-100 border-t-teal-600"></div>
                    <p className="mt-4 text-gray-500">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50 p-4">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Clinica dental especializada
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Bienvenido, {userData?.nombre || userEmail}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { value: '284', label: 'Pacientes', color: 'text-teal-600' },
                    { value: '8', label: 'Citas Hoy', color: 'text-blue-700' },
                    { value: '$12,450', label: 'Ingresos', color: 'text-green-600' },
                    { value: '3', label: 'Pendientes', color: 'text-amber-600' }
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <h3 className={`text-2xl font-bold ${stat.color} mb-2`}>
                            {stat.value}
                        </h3>
                        <p className="text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Citas */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Próximas Citas
                </h2>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div>
                            <strong>María González</strong>
                            <p className="text-gray-500 text-sm mt-1">Limpieza dental</p>
                        </div>
                        <div className="text-right">
                            <strong>09:00 AM</strong>
                            <p className="text-green-600 text-sm mt-1">Confirmada</p>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div>
                            <strong>Carlos Rodríguez</strong>
                            <p className="text-gray-500 text-sm mt-1">Extracción molar</p>
                        </div>
                        <div className="text-right">
                            <strong>10:30 AM</strong>
                            <p className="text-amber-600 text-sm mt-1">Pendiente</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}