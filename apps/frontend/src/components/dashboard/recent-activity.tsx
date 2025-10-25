import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivity() {
  // TODO: Obtener actividad real de la base de datos
  const activities = [
    {
      id: 1,
      type: 'lead',
      message: 'Nuevo lead registrado: Juan Pérez',
      time: 'Hace 5 minutos',
    },
    {
      id: 2,
      type: 'sale',
      message: 'Venta completada: Curso de Inglés B1',
      time: 'Hace 1 hora',
    },
    {
      id: 3,
      type: 'user',
      message: 'Nuevo usuario creado: María García',
      time: 'Hace 2 horas',
    },
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas acciones en el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay actividad reciente</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
