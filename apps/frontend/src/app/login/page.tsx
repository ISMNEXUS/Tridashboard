import { LoginForm } from '@/components/auth/login-form';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Sección izquierda - Branding */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between text-white relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-700 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djhjMCAyLjIxLTEuNzkgNC00IDRoLThjLTIuMjEgMC00LTEuNzktNC00di04YzAtMi4yMSAxLjc5LTQgNC00aDhjMi4yMSAwIDQgMS43OSA0IDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-3xl">T</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight">TRIANGLAIS</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-white via-cyan-200 to-transparent rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-xl opacity-95 font-light">
            Sistema Integral para Academia de Idiomas
          </p>
        </div>
        
        <div className="space-y-6 relative z-10">
          <div className="flex items-center space-x-4 group">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-lg">Gestión Completa</p>
              <p className="text-sm opacity-90">CRM, ERP y Admin Academia</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 group">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-lg">Interfaz Moderna</p>
              <p className="text-sm opacity-90">Diseño intuitivo y responsive</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 group">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-lg">Alto Rendimiento</p>
              <p className="text-sm opacity-90">Tecnología de última generación</p>
            </div>
          </div>
        </div>

        <p className="text-sm opacity-80 relative z-10">
          © 2025 TRIANGLAIS. Todos los derechos reservados.
        </p>
      </div>

      {/* Sección derecha - Formulario de Login */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md animate-slide-up">
          <div className="mb-8 text-center lg:hidden">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-2xl">T</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                TRIANGLAIS
              </h1>
            </div>
            <p className="text-muted-foreground">Sistema Integral para Academia de Idiomas</p>
          </div>
          
          <div className="glass-card rounded-3xl p-8 shadow-2xl backdrop-blur-2xl border border-white/20 dark:border-gray-700/20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Iniciar Sesión
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
            </div>
            <p className="text-muted-foreground mb-8">
              Ingresa tus credenciales para acceder al sistema
            </p>
            
            <LoginForm />
            
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-xs text-center text-muted-foreground">
                Al iniciar sesión, aceptas nuestros términos de servicio y política de privacidad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
