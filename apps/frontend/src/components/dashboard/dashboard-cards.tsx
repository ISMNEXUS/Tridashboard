import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, Settings, TrendingUp } from 'lucide-react';

const modules = [
  {
    title: 'CRM',
    description: 'Gestión de Leads y Clientes',
    icon: Users,
    href: '/dashboard/crm',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'ERP',
    description: 'Ventas, Compras y Finanzas',
    icon: ShoppingCart,
    href: '/dashboard/erp',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Administración',
    description: 'Usuarios, Roles y Cursos',
    icon: Settings,
    href: '/dashboard/admin',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Configuración',
    description: 'Ajustes del Sistema',
    icon: TrendingUp,
    href: '/dashboard/config',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export function DashboardCards() {
  return (
    <>
      {modules.map((module) => (
        <Link key={module.title} href={module.href}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{module.title}</CardTitle>
              <div className={`p-2 rounded-lg ${module.bgColor}`}>
                <module.icon className={`h-4 w-4 ${module.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
