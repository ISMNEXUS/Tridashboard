import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export default function ERPConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración ERP</h2>
        <p className="text-muted-foreground">
          Configuración financiera y de facturación
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajustes Financieros</CardTitle>
          <CardDescription>
            Configura moneda, impuestos y facturación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <DollarSign className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Configuración ERP</h3>
            <p className="text-muted-foreground max-w-md">
              Define moneda, tasas de impuestos, numeración de facturas y términos
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
