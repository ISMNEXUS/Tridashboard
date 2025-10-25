import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Roles y Permisos</h2>
        <p className="text-muted-foreground">
          Control de acceso basado en roles (RBAC)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Roles</CardTitle>
          <CardDescription>
            Roles disponibles en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Administrador</h4>
                <p className="text-sm text-muted-foreground">Acceso total al sistema</p>
              </div>
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Gerente</h4>
                <p className="text-sm text-muted-foreground">Gestión de operaciones</p>
              </div>
              <Shield className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Profesor</h4>
                <p className="text-sm text-muted-foreground">Gestión de clases y estudiantes</p>
              </div>
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Vendedor</h4>
                <p className="text-sm text-muted-foreground">Gestión de ventas y leads</p>
              </div>
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Estudiante</h4>
                <p className="text-sm text-muted-foreground">Acceso a materiales de estudio</p>
              </div>
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Contador</h4>
                <p className="text-sm text-muted-foreground">Gestión financiera</p>
              </div>
              <Shield className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
