import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Clock from './Clock';

configure({ adapter: new Adapter() });


jest.useFakeTimers();

it('renders initial Time', () => {
  const wrapper = shallow(<Clock isClockTicking={false}/>);
  expect(wrapper.contains('0:00')).toEqual(true);
});

it('renders correct Time after completion', () => {
  const wrapper = shallow(<Clock isClockTicking={true} stopGame={() => true}/>);
  jest.runAllTimers();
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(wrapper.contains('0:60')).toEqual(true);
});
