import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArouterComponent } from './arouter.component';

describe('ArouterComponent', () => {
  let component: ArouterComponent;
  let fixture: ComponentFixture<ArouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
