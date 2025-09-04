import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LotStatistics } from "@/types/lot";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Home, Clock, CheckCircle, DollarSign } from "lucide-react";

interface DashboardProps {
  statistics: LotStatistics;
}

export const Dashboard = ({ statistics }: DashboardProps) => {
  const chartData = [
    { name: 'Disponíveis', value: statistics.disponiveis, color: 'hsl(var(--available))' },
    { name: 'Reservados', value: statistics.reservados, color: 'hsl(var(--reserved))' },
    { name: 'Vendidos', value: statistics.vendidos, color: 'hsl(var(--sold))' }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do loteamento</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Lotes</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{statistics.total}</div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
            <Home className="h-4 w-4 text-available" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-available">{statistics.disponiveis}</div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservados</CardTitle>
            <Clock className="h-4 w-4 text-reserved" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-reserved">{statistics.reservados}</div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendidos</CardTitle>
            <CheckCircle className="h-4 w-4 text-sold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sold">{statistics.vendidos}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.percentualVendido}% do total
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-primary">
              {formatCurrency(statistics.valorTotalVendido)}
            </div>
            <p className="text-xs text-muted-foreground">Vendido</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Distribuição de Lotes</CardTitle>
            <CardDescription>Status atual dos lotes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Valores Financeiros</CardTitle>
            <CardDescription>Vendido vs. A Receber</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Vendido', value: statistics.valorTotalVendido },
                  { name: 'A Receber', value: statistics.valorAReceber }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};