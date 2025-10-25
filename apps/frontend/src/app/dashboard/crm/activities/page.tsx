import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Calendar } from 'lucide-react';

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Actividades</h2>
          <p className="text-muted-foreground">
            Registra y gestiona actividades con tus leads
          </p>
        </div>
        <Button>
          <Phone className="mr-2 h-4 w-4" />
          Nueva Actividad
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Actividades</CardTitle>
          <CardDescription>
            Llamadas, reuniones, emails y notas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin actividades registradas</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Registra tus primeras interacciones con los leads
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
