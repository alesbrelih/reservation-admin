import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutView } from './layout.view';

describe('LayoutView', () => {
  let component: LayoutView;
  let fixture: ComponentFixture<LayoutView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutView ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
