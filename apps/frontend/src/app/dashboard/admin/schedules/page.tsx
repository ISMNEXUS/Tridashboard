import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function SchedulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Horarios</h2>
        <p className="text-muted-foreground">
          Programación de clases y asignación de profesores
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendario de Clases</CardTitle>
          <CardDescription>
            Horarios de clases programadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin horarios configurados</h3>
            <p className="text-muted-foreground max-w-md">
              Configura horarios y asigna profesores a cada clase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
