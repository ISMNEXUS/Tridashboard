import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export default function EmailConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración de Email</h2>
        <p className="text-muted-foreground">
          Configuración del servidor de correo y plantillas
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajustes de Email</CardTitle>
          <CardDescription>
            Configura SMTP y plantillas de correo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Mail className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Configuración de Email</h3>
            <p className="text-muted-foreground max-w-md">
              Configura servidor SMTP, email de remitente y plantillas personalizadas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
