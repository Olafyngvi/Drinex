import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzdvojenoComponent } from './izdvojeno.component';

describe('IzdvojenoComponent', () => {
  let component: IzdvojenoComponent;
  let fixture: ComponentFixture<IzdvojenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzdvojenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzdvojenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
