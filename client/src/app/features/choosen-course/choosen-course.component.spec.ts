import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenCourseComponent } from './choosen-course.component';

describe('ChoosenCourseComponent', () => {
  let component: ChoosenCourseComponent;
  let fixture: ComponentFixture<ChoosenCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosenCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosenCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
