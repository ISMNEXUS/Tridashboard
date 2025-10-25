import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function GeneralConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración General</h2>
        <p className="text-muted-foreground">
          Configuración básica del sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajustes Generales</CardTitle>
          <CardDescription>
            Personaliza la configuración básica de TRIANGLAIS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Settings className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Configuración del Sistema</h3>
            <p className="text-muted-foreground max-w-md">
              Aquí podrás configurar el nombre de la aplicación, logo, zona horaria e idioma
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
