import React from 'react';
import { mount } from 'enzyme';
import { Button, Menu } from '@material-ui/core';
import ButtonBar from '../ButtonBar';
import Root from '../../Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <ButtonBar />
    </Root>,
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe('DOM', () => {
  test('renders 3 buttons(login, signup & logout)', () => {
    expect(wrapped.find(Button).length).toEqual(3);
  });

  test('displays menu on smaller screens', () => {
    wrapped = mount(
      <Root>
        <ButtonBar style={{ width: '500px' }} />
      </Root>,
    );
    expect(wrapped.find(Menu).length).toEqual(1);
  });
});
