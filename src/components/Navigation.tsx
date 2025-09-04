import { Button } from '@/components/ui/button';
import { BarChart3, Map, Table, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: 'dashboard' | 'map' | 'table';
  onTabChange: (tab: 'dashboard' | 'map' | 'table') => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'map', label: 'Mapa Interativo', icon: Map },
    { id: 'table', label: 'Tabela de Lotes', icon: Table }
  ] as const;

  return (
    <nav className="border-b bg-card shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Menu className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sistema de Lotes</h1>
              <p className="text-xs text-muted-foreground">Gestão de Loteamento</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-2",
                    activeTab === tab.id && "bg-primary text-primary-foreground shadow-elegant"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};