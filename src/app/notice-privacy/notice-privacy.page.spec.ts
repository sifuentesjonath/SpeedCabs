import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoticePrivacyPage } from './notice-privacy.page';

describe('NoticePrivacyPage', () => {
  let component: NoticePrivacyPage;
  let fixture: ComponentFixture<NoticePrivacyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticePrivacyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticePrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
