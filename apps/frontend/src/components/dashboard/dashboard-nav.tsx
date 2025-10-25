'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings, 
  UserCircle,
  Mail,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Package,
  FileText,
  GraduationCap,
  Calendar
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'CRM',
    icon: Users,
    children: [
      { name: 'Dashboard CRM', href: '/dashboard/crm', icon: TrendingUp },
      { name: 'Leads', href: '/dashboard/crm/leads', icon: UserCircle },
      { name: 'Chat', href: '/dashboard/crm/chat', icon: MessageSquare },
      { name: 'Email', href: '/dashboard/crm/email', icon: Mail },
    ],
  },
  {
    name: 'ERP',
    icon: ShoppingCart,
    children: [
      { name: 'Dashboard ERP', href: '/dashboard/erp', icon: TrendingUp },
      { name: 'Ventas', href: '/dashboard/erp/sales', icon: DollarSign },
      { name: 'Compras', href: '/dashboard/erp/purchases', icon: Package },
      { name: 'Gastos', href: '/dashboard/erp/expenses', icon: FileText },
      { name: 'Facturas', href: '/dashboard/erp/invoices', icon: FileText },
    ],
  },
  {
    name: 'Administración',
    icon: Settings,
    children: [
      { name: 'Usuarios', href: '/dashboard/admin/users', icon: UserCircle },
      { name: 'Roles', href: '/dashboard/admin/roles', icon: Users },
      { name: 'Cursos', href: '/dashboard/admin/courses', icon: GraduationCap },
      { name: 'Horarios', href: '/dashboard/admin/schedules', icon: Calendar },
    ],
  },
  {
    name: 'Configuración',
    href: '/dashboard/config',
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white">
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
                <div className="ml-8 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'flex items-center px-3 py-2 text-sm rounded-md transition-colors',
                        pathname === child.href
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <child.icon className="mr-3 h-4 w-4" />
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href!}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                pathname === item.href
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
