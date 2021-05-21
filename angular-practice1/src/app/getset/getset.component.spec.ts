import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsetComponent } from './getset.component';

describe('GetsetComponent', () => {
  let component: GetsetComponent;
  let fixture: ComponentFixture<GetsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
