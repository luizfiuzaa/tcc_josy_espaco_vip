import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsgDefinidasPage } from './msg-definidas.page';

describe('MsgDefinidasPage', () => {
  let component: MsgDefinidasPage;
  let fixture: ComponentFixture<MsgDefinidasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MsgDefinidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
