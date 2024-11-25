import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent {
  products: any[] = [];
  cart: any[] = []; // Carrinho de compras

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  // Carrega os produtos disponíveis no banco de dados
  async loadProducts() {
    this.products = await this.productService.getProducts();
  }

  // Adiciona um produto ao carrinho
  addToCart(product: any) {
    const existingItem = this.cart.find((item) => item.product.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  // Atualiza a quantidade de um item no carrinho
  updateCartItem(index: number, quantity: number) {
    if (quantity <= 0) {
      this.cart.splice(index, 1); // Remove o item se a quantidade for menor ou igual a zero
    } else {
      this.cart[index].quantity = quantity;
    }
  }

  // Remove um item do carrinho
  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  // Calcula o total do carrinho
  calculateTotal() {
    return this.cart.reduce((total, item) => total + item.product.value * item.quantity, 0);
  }

  // Finaliza a venda e registra no banco de dados
  async checkout() {
    const sale = {
      date: new Date().toISOString(),
      items: this.cart.map((item) => ({
        product: item.product.name,
        quantity: item.quantity,
        total: item.product.value * item.quantity,
      })),
      total: this.calculateTotal(),
    };

    // Atualiza o estoque dos produtos
    for (const item of this.cart) {
      const product = item.product;
      product.stock -= item.quantity;
      await this.productService.updateProduct(product);
    }

    // Registra a venda
    await this.productService.recordSale(sale);

    // Limpa o carrinho e recarrega os produtos
    this.cart = [];
    this.loadProducts();
    alert('Venda realizada com sucesso!');
  }
}