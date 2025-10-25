import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';

export default function CRMConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración CRM</h2>
        <p className="text-muted-foreground">
          Personaliza el módulo de gestión de leads
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajustes del CRM</CardTitle>
          <CardDescription>
            Configura fuentes de leads, estados y plantillas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Database className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Configuración CRM</h3>
            <p className="text-muted-foreground max-w-md">
              Define estados de leads, fuentes, auto-asignación y plantillas de email
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
