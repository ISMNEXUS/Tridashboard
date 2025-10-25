import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, MessageSquare, Mail, TrendingUp, Phone, Activity, FileText, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/loading';

export default function CRMPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            CRM - Gestión de Leads
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Administra tus leads y relaciones con clientes potenciales
          </p>
        </div>
        <Button asChild className="w-full md:w-auto">
          <Link href="/dashboard/crm/leads/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Lead
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No hay leads registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Convertidos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              0% tasa de conversión
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contactos Hoy</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Sin contactos pendientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails Enviados</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>
      </div>
        </Suspense>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/crm/leads">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Leads
              </CardTitle>
              <CardDescription>
                Ver y gestionar todos los leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lista completa de leads con filtros y búsqueda
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/crm/activities">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                Actividades
              </CardTitle>
              <CardDescription>
                Registrar llamadas, reuniones y notas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Historial de actividades con cada lead
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/crm/chat">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Chat
              </CardTitle>
              <CardDescription>
                Comunicación en tiempo real
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sistema de mensajería interna
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/crm/email">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-600" />
                Email
              </CardTitle>
              <CardDescription>
                Gestión de correos electrónicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Envía y recibe emails desde la plataforma
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Leads - Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>Leads Recientes</CardTitle>
          <CardDescription>
            Los últimos leads añadidos al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay leads todavía</h3>
            <p className="text-muted-foreground mb-4">
              Comienza añadiendo tu primer lead para hacer seguimiento
            </p>
            <Button asChild>
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
