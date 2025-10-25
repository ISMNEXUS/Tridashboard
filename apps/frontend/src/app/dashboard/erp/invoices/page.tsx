import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Facturas</h2>
        <p className="text-muted-foreground">
          Generación y gestión de facturas
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Facturas</CardTitle>
          <CardDescription>
            Todas las facturas emitidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin facturas emitidas</h3>
            <p className="text-muted-foreground max-w-md">
              Las facturas se generarán automáticamente desde las ventas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
