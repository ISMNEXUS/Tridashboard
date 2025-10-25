import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Shield, BookOpen, Calendar, FileText, Database, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminAcademiaPage() {
  const stats = {
    totalUsers: 142,
    newUsersThisMonth: 12,
    activeRoles: 6,
    totalCourses: 28,
    activeCourses: 24,
    totalSchedules: 156,
    thisWeekSchedules: 42,
    totalEnrollments: 487,
    pendingEnrollments: 8,
    moodleConnections: 3,
    activeConnections: 2,
  };

  const quickActions = [
    { name: 'Nuevo Usuario', href: '/dashboard/admin/users/new', icon: UserPlus, color: 'blue' },
    { name: 'Gestionar Roles', href: '/dashboard/admin/roles', icon: Shield, color: 'purple' },
    { name: 'Agregar Curso', href: '/dashboard/admin/courses/new', icon: BookOpen, color: 'green' },
    { name: 'Config. Moodle', href: '/dashboard/admin/database-config', icon: Database, color: 'orange' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card p-8 border border-border/40 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
              Admin Academia
            </h1>
            <p className="text-muted-foreground text-lg">
              Panel de administración académica y gestión de usuarios Moodle
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <Button asChild variant="outline" className="glass">
              <Link href="/dashboard/admin/database-config">
                <Database className="mr-2 h-4 w-4" />
                Configurar Moodle
              </Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover-lift">
              <Link href="/dashboard/admin/users/new">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/admin/users" className="group">
          <Card className="glass-card card-interactive hover-lift border border-border/40 transition-all h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Totales</CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{stats.totalUsers}</div>
                <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3 mr-1" />+{stats.newUsersThisMonth} este mes
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center group-hover:text-blue-500 transition-colors">
                Ver todos los usuarios<ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/roles" className="group">
          <Card className="glass-card card-interactive hover-lift border border-border/40 transition-all h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Roles Activos</CardTitle>
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">{stats.activeRoles}</div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center group-hover:text-purple-500 transition-colors">
                Gestionar permisos<ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/courses" className="group">
          <Card className="glass-card card-interactive hover-lift border border-border/40 transition-all h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cursos Disponibles</CardTitle>
                <BookOpen className="h-5 w-5 text-emerald-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">{stats.totalCourses}</div>
                <div className="text-xs text-muted-foreground">{stats.activeCourses} activos</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center group-hover:text-emerald-500 transition-colors">
                Ver catálogo completo<ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/schedules" className="group">
          <Card className="glass-card card-interactive hover-lift border border-border/40 transition-all h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Horarios Programados</CardTitle>
                <Calendar className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">{stats.totalSchedules}</div>
                <div className="text-xs text-muted-foreground">{stats.thisWeekSchedules} esta semana</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center group-hover:text-amber-500 transition-colors">
                Gestionar calendario<ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/enrollments" className="group">
          <Card className="glass-card card-interactive hover-lift border border-border/40 transition-all h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Inscripciones</CardTitle>
                <FileText className="h-5 w-5 text-cyan-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">{stats.totalEnrollments}</div>
                <div className="flex items-center text-xs text-amber-600 dark:text-amber-400">{stats.pendingEnrollments} pendientes</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center group-hover:text-cyan-500 transition-colors">
                Revisar inscripciones<ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/database-config" className="group">
          <Card className="glass-card card-interactive hover-lift border border-border/40 transition-all h-full bg-gradient-to-br from-orange-500/5 to-red-500/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Conexiones Moodle</CardTitle>
                <Database className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">{stats.moodleConnections}</div>
                <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400">● {stats.activeConnections} activas</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center group-hover:text-orange-500 transition-colors">
                Configurar bases de datos<ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="glass-card p-6 border border-border/40 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="bg-gradient-primary bg-clip-text text-transparent">Acciones Rápidas</span>
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Button key={action.name} asChild variant="outline" className="glass card-interactive hover-lift h-auto p-4 justify-start">
              <Link href={action.href}>
                <action.icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{action.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card border border-border/40">
          <CardHeader>
            <CardTitle className="text-base">Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <UserPlus className="h-4 w-4 text-blue-500" />
              <div className="flex-1 text-sm">
                <p className="font-medium">Nuevo usuario registrado</p>
                <p className="text-xs text-muted-foreground">Juan Pérez - hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <BookOpen className="h-4 w-4 text-emerald-500" />
              <div className="flex-1 text-sm">
                <p className="font-medium">Curso actualizado</p>
                <p className="text-xs text-muted-foreground">Matemáticas I - hace 5 horas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Database className="h-4 w-4 text-orange-500" />
              <div className="flex-1 text-sm">
                <p className="font-medium">Conexión Moodle sincronizada</p>
                <p className="text-xs text-muted-foreground">DB Principal - hace 1 día</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border border-border/40">
          <CardHeader>
            <CardTitle className="text-base">Estado del Sistema</CardTitle>
            <CardDescription>Información de infraestructura</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uptime</span>
                <span className="font-medium text-emerald-600">99.9%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500" style={{ width: '99.9%' }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Conexiones DB activas</span>
                <span className="font-medium">{stats.activeConnections}/{stats.moodleConnections}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${(stats.activeConnections/stats.moodleConnections)*100}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cursos activos</span>
                <span className="font-medium">{stats.activeCourses}/{stats.totalCourses}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${(stats.activeCourses/stats.totalCourses)*100}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
