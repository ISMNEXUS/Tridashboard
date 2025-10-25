import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus } from 'lucide-react';
import Link from 'next/link';

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ventas</h2>
          <p className="text-muted-foreground">
            Registro y seguimiento de todas las ventas
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/erp/sales/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Venta
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Ventas</CardTitle>
          <CardDescription>
            Todas las ventas registradas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin ventas registradas</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Comienza a registrar tus ventas de cursos e inscripciones
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard/erp/sales/new">
                <Plus className="mr-2 h-5 w-5" />
                Registrar Primera Venta
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
