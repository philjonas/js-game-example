import {gameStateConfig} from './index';
import {Machine} from 'xstate';

describe('gameStateConfig', () => {
  const machine = Machine({...gameStateConfig});
  const {states} = gameStateConfig;

  it('should reach each state', () => {
    for (const [thisState, value] of Object.entries(states)) {
      const {on} = value;
      for (const [transition, nextState] of Object.entries(on)) {
        const actualState = machine.transition(thisState, {type: transition});
        expect(actualState.value).toBe(nextState);
      }
    }
  });

  it('pause receives pause', () => {
    const machine = Machine({...gameStateConfig});
    const actualState = machine.transition('pause', {type: 'PAUSE'});
    expect(actualState.value).toBe('pause');
  });
});
