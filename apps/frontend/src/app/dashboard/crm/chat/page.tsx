import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Chat</h2>
        <p className="text-muted-foreground">
          Comunicación en tiempo real con leads y estudiantes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Salas de Chat</CardTitle>
          <CardDescription>
            Conversaciones activas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin conversaciones</h3>
            <p className="text-muted-foreground max-w-md">
              Las conversaciones con tus leads aparecerán aquí
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
