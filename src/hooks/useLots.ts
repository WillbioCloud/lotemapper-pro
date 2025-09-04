import { useState, useEffect } from 'react';
import { Lot, LotStatistics, StatusFilter } from '@/types/lot';
import { initialLotsData } from '@/data/lotsData';

export const useLots = () => {
  const [lots, setLots] = useState<Lot[]>(initialLotsData);
  const [filteredLots, setFilteredLots] = useState<Lot[]>(initialLotsData);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Calcular estatísticas
  const statistics: LotStatistics = {
    total: lots.length,
    disponiveis: lots.filter(lot => lot.status === 'disponivel').length,
    reservados: lots.filter(lot => lot.status === 'reservado').length,
    vendidos: lots.filter(lot => lot.status === 'vendido').length,
    percentualVendido: Math.round((lots.filter(lot => lot.status === 'vendido').length / lots.length) * 100),
    valorTotalVendido: lots
      .filter(lot => lot.status === 'vendido')
      .reduce((total, lot) => total + lot.valorTotal, 0),
    valorAReceber: lots
      .filter(lot => lot.status === 'reservado')
      .reduce((total, lot) => total + lot.valorTotal, 0)
  };

  // Aplicar filtros
  useEffect(() => {
    let filtered = lots;

    // Filtro por status
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(lot => lot.status === statusFilter);
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(lot => 
        lot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.quadra.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.lote.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lot.comprador && lot.comprador.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredLots(filtered);
  }, [lots, statusFilter, searchTerm]);

  const updateLot = (updatedLot: Lot) => {
    setLots(prevLots => 
      prevLots.map(lot => lot.id === updatedLot.id ? updatedLot : lot)
    );
  };

  const updateLotCoordinates = (lotId: string, coordinates: { x: number; y: number }) => {
    setLots(prevLots => 
      prevLots.map(lot => 
        lot.id === lotId 
          ? { ...lot, coordenadas: coordinates }
          : lot
      )
    );
  };

  return {
    lots,
    filteredLots,
    statistics,
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    updateLot,
    updateLotCoordinates
  };
};