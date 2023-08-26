import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaturamentosPage } from './faturamentos.page';

describe('FaturamentosPage', () => {
  let component: FaturamentosPage;
  let fixture: ComponentFixture<FaturamentosPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(FaturamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
