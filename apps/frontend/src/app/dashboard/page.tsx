import { auth } from '@/lib/auth';
import { DashboardCards } from '@/components/dashboard/dashboard-cards';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Bienvenido, {session?.user?.name || 'Usuario'}
        </h2>
        <p className="text-muted-foreground">
          Aquí tienes un resumen de tu academia de idiomas
        </p>
      </div>

      {/* Stats Overview */}
      <StatsCards />

      {/* Module Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCards />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RecentActivity />
        </div>
        <div className="lg:col-span-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold mb-4">Accesos Rápidos</h3>
            <div className="space-y-2">
              <a href="/dashboard/crm/leads" className="block p-3 hover:bg-muted rounded-md transition-colors">
                ➕ Crear nuevo Lead
              </a>
              <a href="/dashboard/erp/sales" className="block p-3 hover:bg-muted rounded-md transition-colors">
                💰 Registrar Venta
              </a>
              <a href="/dashboard/admin/users" className="block p-3 hover:bg-muted rounded-md transition-colors">
                👥 Gestionar Usuarios
              </a>
              <a href="/dashboard/admin/courses" className="block p-3 hover:bg-muted rounded-md transition-colors">
                📚 Ver Cursos
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
