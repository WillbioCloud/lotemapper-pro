export interface Lot {
  id: string;
  quadra: string;
  lote: string;
  tamanho: number;
  valorTotal: number;
  entrada: number;
  parcela: number;
  status: 'disponivel' | 'reservado' | 'vendido';
  comprador?: string;
  coordenadas: {
    x: number;
    y: number;
  };
}

export interface LotStatistics {
  total: number;
  disponiveis: number;
  reservados: number;
  vendidos: number;
  percentualVendido: number;
  valorTotalVendido: number;
  valorAReceber: number;
}

export type StatusFilter = 'todos' | 'disponivel' | 'reservado' | 'vendido';