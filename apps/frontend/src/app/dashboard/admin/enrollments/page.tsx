import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export default function EnrollmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Inscripciones</h2>
        <p className="text-muted-foreground">
          Gestión de inscripciones de estudiantes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Inscripciones</CardTitle>
          <CardDescription>
            Estudiantes inscritos en cursos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <UserPlus className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin inscripciones</h3>
            <p className="text-muted-foreground max-w-md">
              Inscribe estudiantes en los cursos disponibles
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
