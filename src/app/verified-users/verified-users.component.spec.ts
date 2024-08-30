import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedUsersComponent } from './verified-users.component';

describe('VerifiedUsersComponent', () => {
  let component: VerifiedUsersComponent;
  let fixture: ComponentFixture<VerifiedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifiedUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
