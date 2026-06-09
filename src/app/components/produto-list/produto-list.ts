import { Router } from '@angular/router';
import { Produto } from '../../models/Produto';
import { ProdutoService } from '../../services/produto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoList implements OnInit {

  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.produtoService.listar().subscribe(data => {
      this.produtos = data;
    });
  }

  editar(id: number) {
    this.router.navigate(['/produtos/editar', id]);
  }

  deletar(id: number) {
    if (confirm('Excluir este produto?')) {
      this.produtoService.deletar(id).subscribe(() => {
        this.carregar(); // atualiza a lista
      });
    }
  }
}