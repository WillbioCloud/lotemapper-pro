import { Lot } from '@/types/lot';

// Dados iniciais dos lotes - simulando dados que viriam de CSV/Excel
export const initialLotsData: Lot[] = [
  {
    id: 'Q1-L01',
    quadra: 'Q1',
    lote: 'L01',
    tamanho: 240,
    valorTotal: 45000,
    entrada: 4500,
    parcela: 850,
    status: 'disponivel',
    coordenadas: { x: 150, y: 120 }
  },
  {
    id: 'Q1-L02',
    quadra: 'Q1',
    lote: 'L02',
    tamanho: 240,
    valorTotal: 45000,
    entrada: 4500,
    parcela: 850,
    status: 'reservado',
    comprador: 'João Silva',
    coordenadas: { x: 180, y: 120 }
  },
  {
    id: 'Q1-L03',
    quadra: 'Q1',
    lote: 'L03',
    tamanho: 240,
    valorTotal: 45000,
    entrada: 4500,
    parcela: 850,
    status: 'vendido',
    comprador: 'Maria Santos',
    coordenadas: { x: 210, y: 120 }
  },
  {
    id: 'Q1-L04',
    quadra: 'Q1',
    lote: 'L04',
    tamanho: 300,
    valorTotal: 55000,
    entrada: 5500,
    parcela: 950,
    status: 'disponivel',
    coordenadas: { x: 240, y: 120 }
  },
  {
    id: 'Q1-L05',
    quadra: 'Q1',
    lote: 'L05',
    tamanho: 300,
    valorTotal: 55000,
    entrada: 5500,
    parcela: 950,
    status: 'vendido',
    comprador: 'Carlos Oliveira',
    coordenadas: { x: 270, y: 120 }
  },
  {
    id: 'Q2-L01',
    quadra: 'Q2',
    lote: 'L01',
    tamanho: 280,
    valorTotal: 50000,
    entrada: 5000,
    parcela: 900,
    status: 'disponivel',
    coordenadas: { x: 150, y: 180 }
  },
  {
    id: 'Q2-L02',
    quadra: 'Q2',
    lote: 'L02',
    tamanho: 280,
    valorTotal: 50000,
    entrada: 5000,
    parcela: 900,
    status: 'reservado',
    comprador: 'Ana Costa',
    coordenadas: { x: 180, y: 180 }
  },
  {
    id: 'Q2-L03',
    quadra: 'Q2',
    lote: 'L03',
    tamanho: 280,
    valorTotal: 50000,
    entrada: 5000,
    parcela: 900,
    status: 'disponivel',
    coordenadas: { x: 210, y: 180 }
  },
  {
    id: 'Q2-L04',
    quadra: 'Q2',
    lote: 'L04',
    tamanho: 320,
    valorTotal: 60000,
    entrada: 6000,
    parcela: 1000,
    status: 'vendido',
    comprador: 'Pedro Lima',
    coordenadas: { x: 240, y: 180 }
  },
  {
    id: 'Q2-L05',
    quadra: 'Q2',
    lote: 'L05',
    tamanho: 320,
    valorTotal: 60000,
    entrada: 6000,
    parcela: 1000,
    status: 'disponivel',
    coordenadas: { x: 270, y: 180 }
  }
];