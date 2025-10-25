import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Cursos</h2>
        <p className="text-muted-foreground">
          Gestión de cursos de inglés (A1-C2)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Cursos</CardTitle>
          <CardDescription>
            Cursos disponibles en la academia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin cursos creados</h3>
            <p className="text-muted-foreground max-w-md">
              Crea cursos de inglés desde nivel A1 hasta C2
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
