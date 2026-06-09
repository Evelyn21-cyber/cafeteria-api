import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../models/Produto';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})
export class ProdutoForm implements OnInit {

  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    disponivel: true
  };

  editando = false;
  id: number | null = null;
  erro = '';
  sucesso = '';

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.editando = true;
      this.service.buscarPorId(this.id).subscribe({
        next: (data) => this.produto = data,
        error: () => this.erro = 'Produto não encontrado.'
      });
    }
  }

  salvar() {
    this.erro = '';
    this.sucesso = '';
    if (this.editando && this.id) {
      this.service.atualizar(this.id, this.produto).subscribe({
        next: () => this.router.navigate(['/produtos']),
        error: () => this.erro = 'Erro ao atualizar. Verifique se o backend está rodando.'
      });
    } else {
      this.service.criar(this.produto).subscribe({
        next: () => this.router.navigate(['/produtos']),
        error: () => this.erro = 'Erro ao criar. Verifique se o backend está rodando.'
      });
    }
  }

  cancelar() {
    this.router.navigate(['/produtos']);
  }
}