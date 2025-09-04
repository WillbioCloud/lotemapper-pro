import { useState } from 'react';
import { Lot, StatusFilter } from '@/types/lot';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Edit, Download, Upload } from 'lucide-react';
import { LotModal } from './LotModal';

interface LotsTableProps {
  lots: Lot[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (filter: StatusFilter) => void;
  onUpdateLot: (lot: Lot) => void;
}

export const LotsTable = ({ 
  lots, 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  onUpdateLot 
}: LotsTableProps) => {
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const colors = {
      'disponivel': 'bg-available text-available-foreground',
      'reservado': 'bg-reserved text-reserved-foreground',
      'vendido': 'bg-sold text-sold-foreground'
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleEditLot = (lot: Lot) => {
    setSelectedLot(lot);
    setIsModalOpen(true);
  };

  const exportToCsv = () => {
    const headers = ['ID', 'Quadra', 'Lote', 'Tamanho', 'Valor Total', 'Entrada', 'Parcela', 'Status', 'Comprador'];
    const csvContent = [
      headers.join(','),
      ...lots.map(lot => [
        lot.id,
        lot.quadra,
        lot.lote,
        lot.tamanho,
        lot.valorTotal,
        lot.entrada,
        lot.parcela,
        lot.status,
        lot.comprador || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lotes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Tabela de Lotes</h2>
        <p className="text-muted-foreground">Gerencie todos os lotes em formato de tabela</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Filtros e Ações</CardTitle>
          <CardDescription>Busque, filtre e exporte dados dos lotes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, quadra, lote ou comprador..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtros de Status */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === 'todos' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onStatusFilterChange('todos')}
              >
                <Filter className="h-4 w-4 mr-1" />
                Todos
              </Button>
              <Button
                variant={statusFilter === 'disponivel' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onStatusFilterChange('disponivel')}
                className={statusFilter === 'disponivel' ? 'bg-available hover:bg-available/90' : ''}
              >
                Disponíveis
              </Button>
              <Button
                variant={statusFilter === 'reservado' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onStatusFilterChange('reservado')}
                className={statusFilter === 'reservado' ? 'bg-reserved hover:bg-reserved/90' : ''}
              >
                Reservados
              </Button>
              <Button
                variant={statusFilter === 'vendido' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onStatusFilterChange('vendido')}
                className={statusFilter === 'vendido' ? 'bg-sold hover:bg-sold/90' : ''}
              >
                Vendidos
              </Button>
            </div>

            {/* Ações */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportToCsv}>
                <Download className="h-4 w-4 mr-1" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Importar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card className="shadow-soft">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Quadra</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead>Tamanho (m²)</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead>Parcela</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comprador</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lots.map((lot) => (
                  <TableRow key={lot.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{lot.id}</TableCell>
                    <TableCell>{lot.quadra}</TableCell>
                    <TableCell>{lot.lote}</TableCell>
                    <TableCell>{lot.tamanho}m²</TableCell>
                    <TableCell>{formatCurrency(lot.valorTotal)}</TableCell>
                    <TableCell>{formatCurrency(lot.entrada)}</TableCell>
                    <TableCell>{formatCurrency(lot.parcela)}</TableCell>
                    <TableCell>{getStatusBadge(lot.status)}</TableCell>
                    <TableCell>{lot.comprador || '-'}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditLot(lot)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {lots.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum lote encontrado com os filtros aplicados.
            </div>
          )}
        </CardContent>
      </Card>

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