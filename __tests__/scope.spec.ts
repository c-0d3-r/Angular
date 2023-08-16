import { Scope } from '../src/scope';

describe('Scope', () => {
  it('can be constructed and used as an object', () => {
    const scope = new Scope() as Record<any, any>;

    scope.aProperty = 1;

    expect(scope.aProperty).toBe(1);
  });

  describe('digest', () => {
    let scope: Record<any, any>;

    beforeEach(() => {
      scope = new Scope();
    });

    it('calls the listener function of watch on first $digest', () => {
      const watchFn = function () {
        return 'test';
      };
      const listenerFn = jest.fn();

      scope.$watch(watchFn, listenerFn);
      scope.$digest();

      expect(listenerFn).toHaveBeenCalledTimes(1);
    });
  });
});
