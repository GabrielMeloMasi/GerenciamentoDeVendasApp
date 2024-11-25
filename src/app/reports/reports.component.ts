import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent  implements OnInit {
  lineChart: any;
  barChart: any;

  constructor(private productService: ProductService) { }

  async ngOnInit() {
    const salesData = await this.productService.getSales();

    // Processar os dados de vendas
    const { monthlySales, monthlyCosts, monthlyQuantities } = this.processSalesData(salesData);

    // Renderizar os gráficos
    this.renderLineChart(monthlySales, monthlyCosts);
    this.renderBarChart(monthlyQuantities);
  }

  // Processa os dados de vendas para os gráficos
  processSalesData(sales: any[]) {
    const monthlySales = Array(12).fill(0); // Total vendido por mês
    const monthlyCosts = Array(12).fill(0); // Total de custo por mês
    const monthlyQuantities = {
      bought: Array(12).fill(0), // Quantidade comprada por mês
      sold: Array(12).fill(0),   // Quantidade vendida por mês
    };

    const currentYear = new Date().getFullYear();

    sales.forEach((sale) => {
      const saleDate = new Date(sale.date);
      if (saleDate.getFullYear() === currentYear) {
        const month = saleDate.getMonth();

        sale.items.forEach((item: any) => {
          monthlySales[month] += item.total; // Total de venda
          monthlyCosts[month] += (item.product.cost || 0) * item.quantity; // Total de custo
          monthlyQuantities.sold[month] += item.quantity; // Quantidade vendida
        });
      }
    });

    return { monthlySales, monthlyCosts, monthlyQuantities };
  }

  // Renderiza o gráfico de linha
  renderLineChart(monthlySales: number[], monthlyCosts: number[]) {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Total Vendido (R$)',
            data: monthlySales,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
          {
            label: 'Total de Custo (R$)',
            data: monthlyCosts,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
    });
  }

  // Renderiza o gráfico de barras
  renderBarChart(monthlyQuantities: { bought: number[]; sold: number[] }) {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Quantidade Vendida',
            data: monthlyQuantities.sold,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Quantidade Comprada',
            data: monthlyQuantities.bought,
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}
