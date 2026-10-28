import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,choose,serialize,restore} from '../src/game.js';
import {scheduleInfluenceEvent} from '../src/influence-events.js';
test('chosen event remains identifiable after saving and loading without replaying its effects',()=>{const s=createGame(7);s.turn=104;s.event=null;s.eventQueue=[];s.influence.russia=45;s.gold=60;assert.ok(scheduleInfluenceEvent(s));const name=s.event.choices[0].name;assert.ok(choose(s,0));const gold=s.gold;const loaded=restore(serialize(s));assert.equal(loaded.lastDecision.choice,name);assert.equal(loaded.lastDecision.turn,104);assert.equal(loaded.gold,gold);assert.equal(loaded.foreignContracts.length,1);assert.equal(loaded.event,null);});
test('invalid decision receipt cannot break a restored campaign UI',()=>{const s=createGame(1);s.lastDecision={turn:s.turn+1,event:'trade',choice:'허용'};assert.equal(restore(serialize(s)),null);});
