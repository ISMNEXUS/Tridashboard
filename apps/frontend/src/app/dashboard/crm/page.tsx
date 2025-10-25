import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, MessageSquare, Mail, TrendingUp, Phone, Activity, FileText, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/loading';

export default function CRMPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="animate-slide-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            CRM - Gestión de Leads
          </h2>
          </div>
          <p className="text-base text-muted-foreground ml-15">
            Administra tus leads y relaciones con clientes potenciales
          </p>
        </div>
        <Button asChild className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 rounded-xl h-11">
          <Link href="/dashboard/crm/leads/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Lead
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="glass-card hover-lift border-none overflow-hidden group animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Users className="h-5 w-5 text-white" />
              </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              0
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              No hay leads registrados
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift border-none overflow-hidden group animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">Convertidos</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  0
                </div>
                <p className="text-xs text-muted-foreground mt-1">
              0% tasa de conversión
            </p>
          </CardContent>
        </Card>

            <Card className="glass-card hover-lift border-none overflow-hidden group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">Contactos Hoy</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Phone className="h-5 w-5 text-white" />
                </div>
          </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  0
                </div>
                <p className="text-xs text-muted-foreground mt-1">
              Sin contactos pendientes
            </p>
          </CardContent>
        </Card>

            <Card className="glass-card hover-lift border-none overflow-hidden group animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">Emails Enviados</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Mail className="h-5 w-5 text-white" />
                </div>
          </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  0
                </div>
                <p className="text-xs text-muted-foreground mt-1">
              Este mes
            </p>
          </CardContent>
        </Card>
      </div>
        </Suspense>

      {/* Quick Actions */}
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full"></div>
            Acciones Rápidas
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-card hover-lift border-none overflow-hidden group cursor-pointer">
          <Link href="/dashboard/crm/leads">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">
                Leads
              </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                Ver y gestionar todos los leads
              </CardDescription>
            </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-muted-foreground/80">
                Lista completa de leads con filtros y búsqueda
              </p>
                <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-cyan-400 font-medium group-hover:gap-2 transition-all">
                  Ver más
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
            </CardContent>
          </Link>
        </Card>

          <Card className="glass-card hover-lift border-none overflow-hidden group cursor-pointer">
          <Link href="/dashboard/crm/activities">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 group-hover:from-emerald-500/10 group-hover:to-green-500/10 transition-all duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">
                Actividades
              </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                Registrar llamadas, reuniones y notas
              </CardDescription>
            </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-muted-foreground/80">
                Historial de actividades con cada lead
              </p>
                <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-green-400 font-medium group-hover:gap-2 transition-all">
                  Ver más
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
            </CardContent>
          </Link>
        </Card>

          <Card className="glass-card hover-lift border-none overflow-hidden group cursor-pointer">
          <Link href="/dashboard/crm/chat">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">
                Chat
              </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                Comunicación en tiempo real
              </CardDescription>
            </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-muted-foreground/80">
                Sistema de mensajería interna
              </p>
                <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-pink-400 font-medium group-hover:gap-2 transition-all">
                  Ver más
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
            </CardContent>
          </Link>
        </Card>

          <Card className="glass-card hover-lift border-none overflow-hidden group cursor-pointer">
          <Link href="/dashboard/crm/email">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">
                Email
              </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                Gestión de correos electrónicos
              </CardDescription>
            </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-muted-foreground/80">
                Envía y recibe emails desde la plataforma
              </p>
                <div className="mt-4 flex items-center text-sm text-amber-600 dark:text-orange-400 font-medium group-hover:gap-2 transition-all">
                  Ver más
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
            </CardContent>
          </Link>
        </Card>
      </div>
        </div>

      {/* Recent Leads - Empty State */}
        <Card className="glass-card border-none">
        <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full"></div>
              Leads Recientes
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
            Los últimos leads añadidos al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 flex items-center justify-center mb-6 shadow-lg">
                <Users className="h-10 w-10 text-blue-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No hay leads todavía</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
              Comienza añadiendo tu primer lead para hacer seguimiento
            </p>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 rounded-xl">
              <Link href="/dashboard/crm/leads/new">
                <UserPlus className="mr-2 h-4 w-4" />
                Crear Primer Lead
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
