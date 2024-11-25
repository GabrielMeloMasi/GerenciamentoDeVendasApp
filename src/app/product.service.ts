import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private dbName = 'SalesDB';
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
  }

  // Inicializa o banco de dados
  private initDB() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      // Tabela de produtos
      if (!db.objectStoreNames.contains('products')) {
        db.createObjectStore('products', { keyPath: 'name' });
      }

      // Tabela de vendas
      if (!db.objectStoreNames.contains('sales')) {
        db.createObjectStore('sales', { autoIncrement: true });
      }
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      console.log('IndexedDB inicializado com sucesso');
    };

    request.onerror = (event: any) => {
      console.error('Erro ao inicializar o IndexedDB:', event.target.error);
    };
  }

  // Adiciona um produto
  addProduct(product: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Banco de dados não inicializado');
      const transaction = this.db.transaction(['products'], 'readwrite');
      const store = transaction.objectStore('products');
      const request = store.add(product);

      request.onsuccess = () => resolve();
      request.onerror = (event: any) => reject(event.target.error);
    });
  }

  // Obtém todos os produtos
  getProducts(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Banco de dados não inicializado');
      const transaction = this.db.transaction(['products'], 'readonly');
      const store = transaction.objectStore('products');
      const request = store.getAll();

      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onerror = (event: any) => reject(event.target.error);
    });
  }

  // Atualiza um produto
  updateProduct(product: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Banco de dados não inicializado');
      const transaction = this.db.transaction(['products'], 'readwrite');
      const store = transaction.objectStore('products');
      const request = store.put(product);

      request.onsuccess = () => resolve();
      request.onerror = (event: any) => reject(event.target.error);
    });
  }

  // Registra uma venda
  recordSale(sale: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Banco de dados não inicializado');
      const transaction = this.db.transaction(['sales'], 'readwrite');
      const store = transaction.objectStore('sales');
      const request = store.add(sale);

      request.onsuccess = () => resolve();
      request.onerror = (event: any) => reject(event.target.error);
    });
  }

  // Obtém todas as vendas
  getSales(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject('Banco de dados não inicializado');
      const transaction = this.db.transaction(['sales'], 'readonly');
      const store = transaction.objectStore('sales');
      const request = store.getAll();

      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onerror = (event: any) => reject(event.target.error);
    });
  }
}
