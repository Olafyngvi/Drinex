import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolovnoComponent } from './polovno.component';

describe('PolovnoComponent', () => {
  let component: PolovnoComponent;
  let fixture: ComponentFixture<PolovnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolovnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolovnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
