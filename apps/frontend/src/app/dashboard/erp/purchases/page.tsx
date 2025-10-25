import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt } from 'lucide-react';

export default function PurchasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Compras</h2>
        <p className="text-muted-foreground">
          Gestión de compras y proveedores
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Compras</CardTitle>
          <CardDescription>
            Registro de compras realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Receipt className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin compras registradas</h3>
            <p className="text-muted-foreground max-w-md">
              Registra las compras de materiales y servicios
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
