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
    <aside className="hidden md:flex w-72 flex-col border-r border-border/40 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
      <nav className="flex-1 space-y-2 p-6">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name} className="space-y-1 animate-slide-in">
                  <div className="flex items-center px-4 py-3 text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </div>
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'group flex items-center px-4 py-2.5 text-sm rounded-xl transition-all duration-300 relative overflow-hidden',
                        pathname === child.href
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 font-medium'
                          : 'text-foreground/70 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:translate-x-1'
                      )}
                    >
                      <child.icon className={cn(
                        "mr-3 h-4 w-4 transition-transform duration-300",
                        pathname === child.href ? "" : "group-hover:scale-110"
                      )} />
                      {child.name}
                      {pathname === child.href && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-pulse"></div>
                      )}
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
                'group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden animate-slide-in',
                pathname === item.href
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-foreground/70 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:translate-x-1'
              )}
            >
              <item.icon className={cn(
                "mr-3 h-5 w-5 transition-transform duration-300",
                pathname === item.href ? "" : "group-hover:scale-110 group-hover:rotate-3"
              )} />
              {item.name}
              {pathname === item.href && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
