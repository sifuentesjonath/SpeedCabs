import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TravelingPage } from './traveling.page';

describe('TravelingPage', () => {
  let component: TravelingPage;
  let fixture: ComponentFixture<TravelingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
