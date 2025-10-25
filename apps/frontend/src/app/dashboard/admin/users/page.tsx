import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
          <p className="text-muted-foreground">
            Gestión de usuarios del sistema
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/users/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            Todos los usuarios con acceso al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gestión de Usuarios</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Actualmente hay 1 usuario administrador. Crea más usuarios para tu equipo.
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard/admin/users/new">
                <UserPlus className="mr-2 h-5 w-5" />
                Crear Usuario
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
