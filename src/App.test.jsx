import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders a trading chart container for the market view', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
        })
      )
    );

    render(<App />);

    const chart = document.getElementById('tradingview_market_chart');
    expect(chart).toBeTruthy();
  });
});
