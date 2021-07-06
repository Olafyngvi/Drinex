import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnoComponent } from './dno.component';

describe('DnoComponent', () => {
  let component: DnoComponent;
  let fixture: ComponentFixture<DnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
