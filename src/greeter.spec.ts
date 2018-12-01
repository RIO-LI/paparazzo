import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { Greeter } from './greeter';

chai.use(sinonChai);

const expect = chai.expect;

describe('Greeter', () => {

  const CUSTOM_GREETING = 'Hola';

  const greeter: Greeter = new Greeter();
  const customGreeter = new Greeter(CUSTOM_GREETING);

  it('should exist', () => {
    expect(Greeter).to.exist;
    expect(Greeter).to.be.a.constructor;
  });

  describe('greet()', () => {

    it('should exist', () => {
      expect(greeter.greet).to.exist;
      expect(typeof greeter.greet).to.be.eq('function');
    });

    it('should print a default greeting to the console', () => {
      const greeting = greeter.greet('World');

      expect(greeting).to.be.eq('Hello, World');
    });

    it('should use a custom greeting if provided', () => {
      const greeting = customGreeter.greet('World');

      expect(greeting).to.be.eq(`${CUSTOM_GREETING}, World`);
    });

  });

  describe('sayGreeting()', () => {

    let logSpy: sinon.SinonSpy;

    beforeEach(() => {
      logSpy = sinon.spy(console, 'log');
    });

    it('should exist', () => {
      expect(greeter.sayGreeting).to.exist;
      expect(typeof greeter.sayGreeting).to.be.eq('function');
    });

    it('should print a default greeting to the console', () => {
      greeter.sayGreeting('World');

      expect(logSpy).to.have.been.calledWith('Hello, World');
    });

    it('should print a custom greeting to the console', () => {
      customGreeter.sayGreeting('World');

      expect(logSpy).to.have.been.calledWith(`${CUSTOM_GREETING}, World`);
    });

    afterEach(() => {
      logSpy.restore();
    });

  });
});
