'use client';
import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [userEmail, setUserEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (!email || isAuthenticated !== 'true') {
            router.push('/');
            return;
        }
        setUserEmail(email);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAuthenticated');
        router.push('/');
    };

    if (!userEmail) {
        return (
            <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f9ff'}}>
                <div style={{textAlign: 'center'}}>
                    <div style={{
                        animation: 'spin 1s linear infinite',
                        borderRadius: '50%',
                        height: '80px',
                        width: '80px',
                        border: '4px solid #e0f2fe',
                        borderTop: '4px solid #0d9488'
                    }}></div>
                    <p style={{marginTop: '1rem', color: '#6b7280'}}>Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{minHeight: '100vh', backgroundColor: '#f0f9ff', padding: '1rem'}}>
            {/* Header */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>
                            DentalCare Pro
                        </h1>
                        <p style={{color: '#6b7280', margin: '4px 0 0 0'}}>Bienvenido, Dr. {userEmail}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#dc2626',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                {[
                    { value: '284', label: 'Pacientes', color: '#0d9488' },
                    { value: '8', label: 'Citas Hoy', color: '#0369a1' },
                    { value: '$12,450', label: 'Ingresos', color: '#059669' },
                    { value: '3', label: 'Pendientes', color: '#d97706' }
                ].map((stat, index) => (
                    <div key={index} style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        padding: '1.5rem',
                        textAlign: 'center'
                    }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: stat.color,
                            margin: '0 0 8px 0'
                        }}>
                            {stat.value}
                        </h3>
                        <p style={{color: '#6b7280', margin: 0}}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Citas */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                padding: '1.5rem'
            }}>
                <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    margin: '0 0 1rem 0',
                    color: '#1f2937'
                }}>
                    Próximas Citas
                </h2>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        backgroundColor: '#f0f9ff',
                        borderRadius: '8px'
                    }}>
                        <div>
                            <strong>María González</strong>
                            <p style={{margin: '4px 0 0 0', color: '#6b7280'}}>Limpieza dental</p>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <strong>09:00 AM</strong>
                            <p style={{margin: '4px 0 0 0', color: '#059669'}}>Confirmada</p>
                        </div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        backgroundColor: '#f0f9ff',
                        borderRadius: '8px'
                    }}>
                        <div>
                            <strong>Carlos Rodríguez</strong>
                            <p style={{margin: '4px 0 0 0', color: '#6b7280'}}>Extracción molar</p>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <strong>10:30 AM</strong>
                            <p style={{margin: '4px 0 0 0', color: '#d97706'}}>Pendiente</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}