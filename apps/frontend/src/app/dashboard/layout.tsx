import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { ThemeToggle } from '@/components/dashboard/theme-toggle';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
        <div className="flex h-16 md:h-18 items-center px-4 md:px-8">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  TRIANGLAIS
                </h1>
                <p className="text-[10px] text-muted-foreground hidden md:block">Sistema Integral</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-3 md:space-x-4">
            <ThemeToggle />
            <UserNav user={session.user} />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <DashboardNav />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 animate-fade-in">
          <div className="max-w-[1920px] mx-auto">
          {children}
          </div>
        </main>
      </div>
    </div>
  );
}
