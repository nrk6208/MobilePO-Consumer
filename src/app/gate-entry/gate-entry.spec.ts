import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateEntryPage } from './gate-entry.page';

describe('HomePage', () => {
  let component: GateEntryPage;
  let fixture: ComponentFixture<GateEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateEntryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
