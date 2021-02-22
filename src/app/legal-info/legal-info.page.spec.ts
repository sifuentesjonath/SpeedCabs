import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LegalInfoPage } from './legal-info.page';

describe('LegalInfoPage', () => {
  let component: LegalInfoPage;
  let fixture: ComponentFixture<LegalInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LegalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
