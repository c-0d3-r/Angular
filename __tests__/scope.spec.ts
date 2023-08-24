import { Scope } from '../src/scope';

describe('Scope', () => {
  it('can be constructed and used as an object', () => {
    const scope = new Scope() as Record<any, any>;

    scope.aProperty = 1;

    expect(scope.aProperty).toBe(1);
  });

  describe('digest', () => {
    let scope: Scope & { [key: string]: any };

    beforeEach(() => {
      scope = new Scope();
    });

    it('should call the listener function when the watched value changed', () => {
      scope.counter = 0;

      scope.$watch(
        function (scope: Record<any, any>) {
          return scope.counter;
        },
        function (newValue: number, oldValue: number, scope: Record<any, any>) {
          scope.counter++;
        }
      );

      expect(scope.counter).toBe(0);

      scope.$digest();

      expect(scope.counter).toBe(1);

      scope.$digest();

      expect(scope.counter).toBe(2);
    });
  });
});
