import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinModificationFormComponent } from './medecin-modification-form.component';

describe('MedecinModificationFormComponent', () => {
  let component: MedecinModificationFormComponent;
  let fixture: ComponentFixture<MedecinModificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinModificationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinModificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
