import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicosPage } from './servicos.page';

describe('ServicosPage', () => {
  let component: ServicosPage;
  let fixture: ComponentFixture<ServicosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ServicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
