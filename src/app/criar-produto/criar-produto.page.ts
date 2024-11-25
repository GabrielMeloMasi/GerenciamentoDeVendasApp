import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.page.html',
  styleUrls: ['./criar-produto.page.scss'],
})
export class CriarProdutoPage {
  products: any[] = []; // Lista de produtos cadastrados
  newProduct = { name: '', value: 0, stock: 0 }; // Objeto para criar um novo produto

  constructor(private productService: ProductService) {
    this.loadProducts(); // Carrega produtos ao iniciar a página
  }

  // Carrega os produtos do banco de dados
  async loadProducts() {
    this.products = await this.productService.getProducts();
  }

  // Adiciona um novo produto
  async addProduct() {
    if (this.newProduct.name && this.newProduct.value > 0 && this.newProduct.stock > 0) {
      await this.productService.addProduct(this.newProduct); // Salva no banco de dados
      this.newProduct = { name: '', value: 0, stock: 0 }; // Reseta o formulário
      this.loadProducts(); // Atualiza a lista de produtos
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }
}