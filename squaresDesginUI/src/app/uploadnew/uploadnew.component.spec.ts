import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadnewComponent } from './uploadnew.component';

describe('UploadnewComponent', () => {
  let component: UploadnewComponent;
  let fixture: ComponentFixture<UploadnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
