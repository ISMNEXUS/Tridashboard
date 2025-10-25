import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Send } from 'lucide-react';

export default function EmailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Email</h2>
          <p className="text-muted-foreground">
            Gestión de correos electrónicos
          </p>
        </div>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Nuevo Email
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bandeja de Entrada</CardTitle>
          <CardDescription>
            Correos electrónicos recibidos y enviados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Mail className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Bandeja vacía</h3>
            <p className="text-muted-foreground max-w-md">
              Configura tu cuenta de email para comenzar a enviar y recibir correos
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
