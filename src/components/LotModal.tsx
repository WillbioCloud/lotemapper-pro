import { useState } from 'react';
import { Lot } from '@/types/lot';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, DollarSign, User } from 'lucide-react';

interface LotModalProps {
  lot: Lot;
  isOpen: boolean;
  onClose: () => void;
  onSave: (lot: Lot) => void;
}

export const LotModal = ({ lot, isOpen, onClose, onSave }: LotModalProps) => {
  const [editedLot, setEditedLot] = useState<Lot>(lot);

  const handleSave = () => {
    onSave(editedLot);
    onClose();
  };

  const handleCancel = () => {
    setEditedLot(lot); // Reset to original
    onClose();
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'bg-available text-available-foreground';
      case 'reservado': return 'bg-reserved text-reserved-foreground';
      case 'vendido': return 'bg-sold text-sold-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Editar Lote {editedLot.id}
          </DialogTitle>
          <DialogDescription>
            Modifique as informações do lote abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <Badge className={getStatusBadgeColor(editedLot.status)}>
              {editedLot.status.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              X: {editedLot.coordenadas.x.toFixed(0)}, Y: {editedLot.coordenadas.y.toFixed(0)}
            </div>
          </div>

          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quadra">Quadra</Label>
              <Input
                id="quadra"
                value={editedLot.quadra}
                onChange={(e) => setEditedLot({...editedLot, quadra: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lote">Lote</Label>
              <Input
                id="lote"
                value={editedLot.lote}
                onChange={(e) => setEditedLot({...editedLot, lote: e.target.value})}
              />
            </div>
          </div>

          {/* Tamanho */}
          <div className="space-y-2">
            <Label htmlFor="tamanho">Tamanho (m²)</Label>
            <Input
              id="tamanho"
              type="number"
              value={editedLot.tamanho}
              onChange={(e) => setEditedLot({...editedLot, tamanho: Number(e.target.value)})}
            />
          </div>

          {/* Valores Financeiros */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <Label className="text-base font-medium">Valores</Label>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="valorTotal">Valor Total</Label>
                <Input
                  id="valorTotal"
                  type="number"
                  value={editedLot.valorTotal}
                  onChange={(e) => setEditedLot({...editedLot, valorTotal: Number(e.target.value)})}
                />
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(editedLot.valorTotal)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entrada">Entrada</Label>
                  <Input
                    id="entrada"
                    type="number"
                    value={editedLot.entrada}
                    onChange={(e) => setEditedLot({...editedLot, entrada: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parcela">Parcela Mensal</Label>
                  <Input
                    id="parcela"
                    type="number"
                    value={editedLot.parcela}
                    onChange={(e) => setEditedLot({...editedLot, parcela: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={editedLot.status} 
              onValueChange={(value: 'disponivel' | 'reservado' | 'vendido') => 
                setEditedLot({...editedLot, status: value})
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponivel">Disponível</SelectItem>
                <SelectItem value="reservado">Reservado</SelectItem>
                <SelectItem value="vendido">Vendido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comprador */}
          {(editedLot.status === 'reservado' || editedLot.status === 'vendido') && (
            <div className="space-y-2">
              <Label htmlFor="comprador" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Comprador
              </Label>
              <Input
                id="comprador"
                value={editedLot.comprador || ''}
                onChange={(e) => setEditedLot({...editedLot, comprador: e.target.value})}
                placeholder="Nome do comprador"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};