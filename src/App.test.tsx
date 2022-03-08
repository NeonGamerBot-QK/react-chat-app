import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const el = document.getElementById('app')
  expect(el).not.toBe(null);
});

