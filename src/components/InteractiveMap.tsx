import { useState, useRef, useCallback } from 'react';
import { Lot, StatusFilter } from '@/types/lot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, ZoomOut, RotateCcw, Filter } from 'lucide-react';
import { LotModal } from './LotModal';
import { cn } from '@/lib/utils';

interface InteractiveMapProps {
  lots: Lot[];
  onUpdateLot: (lot: Lot) => void;
  onUpdateCoordinates: (lotId: string, coordinates: { x: number; y: number }) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (filter: StatusFilter) => void;
}

export const InteractiveMap = ({ 
  lots, 
  onUpdateLot, 
  onUpdateCoordinates,
  statusFilter,
  onStatusFilterChange 
}: InteractiveMapProps) => {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedLot, setDraggedLot] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'bg-available hover:bg-available/80';
      case 'reservado': return 'bg-reserved hover:bg-reserved/80';
      case 'vendido': return 'bg-sold hover:bg-sold/80';
      default: return 'bg-muted';
    }
  };

  const handleLotClick = (lot: Lot) => {
    if (!draggedLot) {
      setSelectedLot(lot);
      setIsModalOpen(true);
    }
  };

  const handleLotDragStart = (e: React.MouseEvent, lotId: string) => {
    e.stopPropagation();
    setDraggedLot(lotId);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleLotDragEnd = (e: React.MouseEvent, lotId: string) => {
    if (draggedLot === lotId && mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const newX = (e.clientX - rect.left - pan.x) / zoom;
      const newY = (e.clientY - rect.top - pan.y) / zoom;
      
      onUpdateCoordinates(lotId, { x: newX, y: newY });
    }
    setDraggedLot(null);
  };

  const handleMapMouseDown = (e: React.MouseEvent) => {
    if (!draggedLot) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !draggedLot) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMapMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const filteredLots = statusFilter === 'todos' 
    ? lots 
    : lots.filter(lot => lot.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Mapa Interativo</h2>
          <p className="text-muted-foreground">Clique nos pontos para editar ou arraste para reposicionar</p>
        </div>
        
        {/* Controles */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filtros de Status */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Button
          variant={statusFilter === 'todos' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusFilterChange('todos')}
        >
          Todos ({lots.length})
        </Button>
        <Button
          variant={statusFilter === 'disponivel' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusFilterChange('disponivel')}
          className={statusFilter === 'disponivel' ? 'bg-available hover:bg-available/90' : ''}
        >
          Disponíveis ({lots.filter(l => l.status === 'disponivel').length})
        </Button>
        <Button
          variant={statusFilter === 'reservado' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusFilterChange('reservado')}
          className={statusFilter === 'reservado' ? 'bg-reserved hover:bg-reserved/90' : ''}
        >
          Reservados ({lots.filter(l => l.status === 'reservado').length})
        </Button>
        <Button
          variant={statusFilter === 'vendido' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusFilterChange('vendido')}
          className={statusFilter === 'vendido' ? 'bg-sold hover:bg-sold/90' : ''}
        >
          Vendidos ({lots.filter(l => l.status === 'vendido').length})
        </Button>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border shadow-soft">
        <span className="text-sm font-medium">Legenda:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-available"></div>
          <span className="text-sm">Disponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-reserved"></div>
          <span className="text-sm">Reservado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sold"></div>
          <span className="text-sm">Vendido</span>
        </div>
      </div>

      {/* Mapa */}
      <div className="relative border rounded-lg bg-card shadow-soft overflow-hidden">
        <div
          ref={mapRef}
          className="relative w-full h-[600px] bg-gradient-to-br from-green-50 to-blue-50 cursor-move"
          onMouseDown={handleMapMouseDown}
          onMouseMove={handleMapMouseMove}
          onMouseUp={handleMapMouseUp}
          onMouseLeave={handleMapMouseUp}
          style={{
            backgroundImage: `url('/lovable-uploads/0397a8c8-ab13-41b7-8dde-ebf84c3ee5b8.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            {filteredLots.map((lot) => (
              <div
                key={lot.id}
                className={cn(
                  "absolute w-4 h-4 rounded-full border-2 border-white cursor-pointer shadow-lg transition-all duration-200 hover:scale-125 hover:shadow-xl z-10",
                  getStatusColor(lot.status),
                  draggedLot === lot.id && "scale-125 shadow-xl"
                )}
                style={{
                  left: lot.coordenadas.x,
                  top: lot.coordenadas.y,
                }}
                onMouseDown={(e) => handleLotDragStart(e, lot.id)}
                onMouseUp={(e) => handleLotDragEnd(e, lot.id)}
                onClick={() => handleLotClick(lot)}
                title={`${lot.id} - ${lot.status}`}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-1 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {lot.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {selectedLot && (
        <LotModal
          lot={selectedLot}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedLot(null);
          }}
          onSave={onUpdateLot}
        />
      )}
    </div>
  );
};