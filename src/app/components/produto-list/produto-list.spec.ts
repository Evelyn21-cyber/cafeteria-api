import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProdutoList } from './produto-list';
import { ProdutoService } from '../../services/produto';

describe('ProdutoList', () => {
  let component: ProdutoList;
  let fixture: ComponentFixture<ProdutoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoList],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ProdutoService, useValue: { listar: () => ({ subscribe: (fn: any) => fn([]) }), deletar: (id: number) => ({ subscribe: (fn: any) => fn(null) }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
