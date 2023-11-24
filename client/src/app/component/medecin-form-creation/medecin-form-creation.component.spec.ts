import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinFormCreationComponent } from './medecin-form-creation.component';

describe('MedecinFormCreationComponent', () => {
  let component: MedecinFormCreationComponent;
  let fixture: ComponentFixture<MedecinFormCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinFormCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinFormCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
