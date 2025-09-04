import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { InteractiveMap } from '@/components/InteractiveMap';
import { LotsTable } from '@/components/LotsTable';
import { useLots } from '@/hooks/useLots';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'table'>('dashboard');
  
  const {
    lots,
    filteredLots,
    statistics,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    updateLot,
    updateLotCoordinates
  } = useLots();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard statistics={statistics} />;
      case 'map':
        return (
          <InteractiveMap
            lots={lots}
            onUpdateLot={updateLot}
            onUpdateCoordinates={updateLotCoordinates}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        );
      case 'table':
        return (
          <LotsTable
            lots={filteredLots}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onUpdateLot={updateLot}
          />
        );
      default:
        return <Dashboard statistics={statistics} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
