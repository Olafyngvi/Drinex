import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiskalizacijaComponent } from './fiskalizacija.component';

describe('FiskalizacijaComponent', () => {
  let component: FiskalizacijaComponent;
  let fixture: ComponentFixture<FiskalizacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiskalizacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiskalizacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
