import { PushPipe } from '../../src/lib/push';
import { async, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Component } from '@angular/core';
import { getGlobalThis } from '../../src/lib/core/utils';
import { EMPTY, NEVER, Observable, of } from 'rxjs';
import { MockChangeDetectorRef } from '../fixtures';

let pushPipe: any;

const setupPushPipeComponent = () => {
  TestBed.configureTestingModule({
    providers: [
      PushPipe,
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef }
    ]
  });
  pushPipe = TestBed.inject(PushPipe);
};

describe('PushPipe used as a Service', () => {
  beforeEach(async(setupPushPipeComponent));

  it('should be instantiable', () => {
    expect(pushPipe).toBeDefined();
  });

  describe('transform function', () => {
    it('should return undefined as value when initially undefined was passed (as no value ever was emitted)', () => {
      expect(pushPipe.transform(undefined)).toBe(undefined);
    });

    it('should return null as value when initially null was passed (as no value ever was emitted)', () => {
      expect(pushPipe.transform(null)).toBe(null);
    });

    it('should return undefined as value when initially of(undefined) was passed (as undefined was emitted)', () => {
      expect(pushPipe.transform(of(undefined))).toBe(undefined);
    });

    it('should return null as value when initially of(null) was passed (as null was emitted)', () => {
      expect(pushPipe.transform(of(null))).toBe(null);
    });

    it('should return undefined as value when initially EMPTY was passed (as no value ever was emitted)', () => {
      expect(pushPipe.transform(EMPTY)).toBe(undefined);
    });

    it('should return undefined as value when initially NEVER was passed (as no value ever was emitted)', () => {
      expect(pushPipe.transform(NEVER)).toBe(undefined);
    });

    it('should return emitted value from passed observable without changing it', () => {
      expect(pushPipe.transform(of(42))).toBe(42);
    });

    it('should return undefined as value when a new observable NEVER was passed (as no value ever was emitted from new observable)', () => {
      expect(pushPipe.transform(of(42))).toBe(42);
      expect(pushPipe.transform(NEVER)).toBe(undefined);
    });
  });
});
