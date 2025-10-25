import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gastos</h2>
        <p className="text-muted-foreground">
          Control de gastos operativos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Gastos</CardTitle>
          <CardDescription>
            Todos los gastos registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin gastos registrados</h3>
            <p className="text-muted-foreground max-w-md">
              Mantén un registro de todos los gastos de la academia
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
