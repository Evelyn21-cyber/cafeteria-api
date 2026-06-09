import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produto } from '../../models/Produto';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.css'
})
export class ProdutoList implements OnInit {

  produtos: Produto[] = [];
  erro = '';

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.erro = '';
    this.produtoService.listar().subscribe({
      next: (data) => this.produtos = data,
      error: () => this.erro = 'Não foi possível conectar ao backend.'
    });
  }

  editar(id: number) {
    this.router.navigate(['/produtos/editar', id]);
  }

  deletar(id: number) {
    if (confirm('Excluir este produto?')) {
      this.produtoService.deletar(id).subscribe({
        next: () => this.carregar(),
        error: () => this.erro = 'Erro ao excluir produto.'
      });
    }
  }
}