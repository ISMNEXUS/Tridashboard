import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import Link from 'next/link';

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Gestiona todos los leads de tu academia
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/crm/leads/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Lead
          </Link>
        </Button>
      </div>

      {/* Empty State */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Leads</CardTitle>
          <CardDescription>
            Todos tus leads potenciales en un solo lugar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No hay leads registrados</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Comienza a construir tu base de datos de leads añadiendo el primero.
              Podrás hacer seguimiento y convertirlos en estudiantes.
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard/crm/leads/new">
                <UserPlus className="mr-2 h-5 w-5" />
                Crear Primer Lead
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
