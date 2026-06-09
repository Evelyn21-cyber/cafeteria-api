import { Routes } from '@angular/router';
import { ProdutoList } from './components/produto-list/produto-list';
import { ProdutoForm } from './components/produto-form/produto-form';

export const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutoList },
  { path: 'produtos/novo', component: ProdutoForm },
  { path: 'produtos/editar/:id', component: ProdutoForm }
];