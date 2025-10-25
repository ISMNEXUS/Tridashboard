import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, DollarSign, GraduationCap } from 'lucide-react';

export function StatsCards() {
  // TODO: Obtener datos reales de la base de datos
  const stats = [
    {
      title: 'Total Leads',
      value: '0',
      change: '+0%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Ventas del Mes',
      value: '$0',
      change: '+0%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: 'Estudiantes Activos',
      value: '0',
      change: '+0%',
      icon: GraduationCap,
      trend: 'up',
    },
    {
      title: 'Tasa de Conversión',
      value: '0%',
      change: '+0%',
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                {stat.change}
              </span>{' '}
              desde el mes pasado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
