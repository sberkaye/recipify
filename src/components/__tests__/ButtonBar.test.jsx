import React from 'react';
import { mount } from 'enzyme';
import { Button, Menu } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ButtonBar from '../ButtonBar';
import Root from '../../Root';

let wrapped;
const history = createBrowserHistory();

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Router history={history}>
        <ButtonBar />
      </Router>
    </Root>,
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe('DOM', () => {
  test('renders 7 buttons for xs screens(login, signup, logout & 4 recipes(1 view button for each))', () => {
    expect(wrapped.find(Button).length).toEqual(7);
  });

  test('displays menu on smaller screens', () => {
    wrapped = mount(
      <Root>
        <Router history={history}>
          <ButtonBar style={{ width: '500px' }} />
        </Router>
      </Root>,
    );
    expect(wrapped.find(Menu).length).toEqual(1);
  });
});
