import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LembretesPage } from './lembretes.page';

describe('LembretesPage', () => {
  let component: LembretesPage;
  let fixture: ComponentFixture<LembretesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LembretesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
