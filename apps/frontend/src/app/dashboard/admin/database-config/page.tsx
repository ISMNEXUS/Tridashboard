'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Database, Plus, Trash2, Check, X, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface MoodleConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  status: 'active' | 'inactive' | 'error';
  lastSync: string;
}

export default function DatabaseConfigPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [connections, setConnections] = useState<MoodleConnection[]>([
    {
      id: '1',
      name: 'Moodle Principal',
      host: '72.60.30.253',
      port: 3306,
      database: 'moodle_prod',
      username: 'moodle_user',
      status: 'active',
      lastSync: 'Hace 5 minutos',
    },
    {
      id: '2',
      name: 'Moodle Testing',
      host: '72.60.30.253',
      port: 3306,
      database: 'moodle_test',
      username: 'moodle_test',
      status: 'inactive',
      lastSync: 'Hace 2 días',
    },
  ]);

  const [newConnection, setNewConnection] = useState({
    name: '',
    host: '',
    port: 3306,
    database: '',
    username: '',
    password: '',
  });

  const handleAddConnection = () => {
    const connection: MoodleConnection = {
      id: Date.now().toString(),
      name: newConnection.name,
      host: newConnection.host,
      port: newConnection.port,
      database: newConnection.database,
      username: newConnection.username,
      status: 'inactive',
      lastSync: 'Nunca',
    };
    setConnections([...connections, connection]);
    setNewConnection({
      name: '',
      host: '',
      port: 3306,
      database: '',
      username: '',
      password: '',
    });
  };

  const handleDeleteConnection = (id: string) => {
    setConnections(connections.filter((conn) => conn.id !== id));
  };

  const handleTestConnection = async (id: string) => {
    // Aquí iría la lógica para probar la conexión
    console.log('Testing connection:', id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"><Check className="h-3 w-3 mr-1" />Activa</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><X className="h-3 w-3 mr-1" />Inactiva</Badge>;
      case 'error':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-8 border border-border/40 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <Database className="h-8 w-8 text-orange-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-2">
              Configuración de Bases de Datos Moodle
            </h1>
            <p className="text-muted-foreground text-lg">
              Gestiona las conexiones a las bases de datos de usuarios para acceso a Moodle
            </p>
          </div>
        </div>
      </div>

      {/* Agregar Nueva Conexión */}
      <Card className="glass-card border border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-emerald-500" />
            Agregar Nueva Conexión
          </CardTitle>
          <CardDescription>
            Configura una nueva conexión a una base de datos MySQL/MariaDB de Moodle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Conexión</Label>
              <Input
                id="name"
                placeholder="ej: Moodle Campus Norte"
                value={newConnection.name}
                onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="host">Host / IP</Label>
              <Input
                id="host"
                placeholder="ej: 72.60.30.253"
                value={newConnection.host}
                onChange={(e) => setNewConnection({ ...newConnection, host: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="port">Puerto</Label>
              <Input
                id="port"
                type="number"
                placeholder="3306"
                value={newConnection.port}
                onChange={(e) => setNewConnection({ ...newConnection, port: parseInt(e.target.value) || 3306 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="database">Nombre de la Base de Datos</Label>
              <Input
                id="database"
                placeholder="ej: moodle_campus_norte"
                value={newConnection.database}
                onChange={(e) => setNewConnection({ ...newConnection, database: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                placeholder="ej: moodle_user"
                value={newConnection.username}
                onChange={(e) => setNewConnection({ ...newConnection, username: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={newConnection.password}
                  onChange={(e) => setNewConnection({ ...newConnection, password: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setNewConnection({
              name: '',
              host: '',
              port: 3306,
              database: '',
              username: '',
              password: '',
            })}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddConnection}
              disabled={!newConnection.name || !newConnection.host || !newConnection.database}
              className="bg-gradient-primary hover-lift"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Conexión
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Conexiones Existentes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Conexiones Configuradas</h2>
        <div className="grid gap-4">
          {connections.map((connection) => (
            <Card key={connection.id} className="glass-card card-interactive border border-border/40">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                      <Database className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{connection.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {connection.username}@{connection.host}:{connection.port}/{connection.database}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(connection.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Última sincronización: {connection.lastSync}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestConnection(connection.id)}
                      className="glass"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Probar Conexión
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteConnection(connection.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Información de Ayuda */}
      <Card className="glass-card border border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Información Importante
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Las contraseñas se almacenan de forma encriptada en la base de datos.</p>
          <p>• Solo se requiere acceso de lectura (SELECT) para sincronizar usuarios de Moodle.</p>
          <p>• La sincronización se realiza automáticamente cada 24 horas.</p>
          <p>• Puedes probar la conexión antes de guardarla usando el botón &quot;Probar Conexión&quot;.</p>
          <p>• Asegúrate de que el firewall permita conexiones desde este servidor: <code className="px-1.5 py-0.5 bg-muted rounded">72.60.30.253</code></p>
        </CardContent>
      </Card>
    </div>
  );
}
