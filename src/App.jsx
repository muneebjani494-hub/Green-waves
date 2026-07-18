import { useEffect, useMemo, useState } from 'react';

const chartSymbols = [
  { symbol: 'NASDAQ:AAPL', name: 'Apple' },
  { symbol: 'NASDAQ:MSFT', name: 'Microsoft' },
  { symbol: 'NYSE:SPY', name: 'S&P 500' },
];

const depositMethods = [
  'JazzCash',
  'EasyPaisa',
  'Bank Transfer',
  'Binance',
];

const marketColumns = ['Symbol', 'Price', '24h Change', 'Market Cap'];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [accountMode, setAccountMode] = useState('Demo');
  const [demoBalance, setDemoBalance] = useState(10000);
  const [liveBalance] = useState(2500);
  const [depositMethod, setDepositMethod] = useState(depositMethods[0]);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositRequests, setDepositRequests] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [loadingMarket, setLoadingMarket] = useState(true);
  const [depositMessage, setDepositMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMarket() {
      setLoadingMarket(true);
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false',
          { signal: controller.signal }
        );
        const data = await response.json();
        setMarketData(data || []);
      } catch (error) {
        console.error('Market data load failed', error);
      } finally {
        setLoadingMarket(false);
      }
    }

    fetchMarket();
    const interval = setInterval(fetchMarket, 30000);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  const handleDepositRequest = () => {
    setDepositMessage('');
    const amount = Number(depositAmount);
    if (!amount || amount <= 0) {
      setDepositMessage('Enter a valid deposit amount.');
      return;
    }

    const request = {
      id: Date.now(),
      method: depositMethod,
      amount,
      createdAt: new Date().toLocaleString(),
      status: 'Pending',
    };

    setDepositRequests((current) => [request, ...current]);
    setDepositAmount('');
    setDepositMessage(`Deposit request created for ${depositMethod}. A support agent will review it.`);
  };

  const handleSwitchMode = () => {
    setAccountMode((mode) => (mode === 'Demo' ? 'Live' : 'Demo'));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/80 px-5 py-4 shadow-2xl shadow-emerald-500/10 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
                <svg viewBox="0 0 64 64" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="6" y="6" width="52" height="52" rx="14" fill="#020617" />
                  <path d="M13 42c8-16 16-24 24-24 8 0 12 10 20 10 4 0 8-4 12-10" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 28h8" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
                  <path d="M25 21h8" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
                  <path d="M37 31h8" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">Green Waves</p>
                <p className="text-sm text-slate-400">Global market intelligence</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-full border border-slate-800 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
                {accountMode} access
              </div>
              <button
                onClick={handleSwitchMode}
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Switch to {accountMode === 'Demo' ? 'Live' : 'Demo'} Mode
              </button>
            </div>
          </div>
        </header>

        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">Green Waves</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Trading dashboard for international markets
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400 sm:text-lg">
            Practice with a demo account, request manual deposits, and monitor live global market data from a trusted feed.
          </p>
        </div>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-emerald-500/10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Account summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{accountMode} trading wallet</h2>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                  {accountMode}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Demo balance</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{formatCurrency(demoBalance)}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Live balance</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{formatCurrency(liveBalance)}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Total equity</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{formatCurrency(demoBalance + liveBalance)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Market feed</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Live international data</h2>
                </div>
                <p className="text-sm text-slate-400">Updated every 30 seconds</p>
              </div>

              <div
                id="tradingview_market_chart"
                className="mt-6 h-[320px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90"
                aria-label="Trading chart"
              >
                <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-slate-400">
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Chart placeholder</p>
                  <p className="max-w-md text-sm leading-6">
                    Add a TradingView widget script in the page head or replace this fallback with your preferred market API feed.
                  </p>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {chartSymbols.map((item) => (
                      <span key={item.symbol} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90">
                <div className="grid grid-cols-4 gap-4 bg-slate-900 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-500 sm:grid-cols-4">
                  {marketColumns.map((column) => (
                    <span key={column}>{column}</span>
                  ))}
                </div>
                <div className="divide-y divide-slate-800">
                  {loadingMarket ? (
                    <div className="p-6 text-center text-slate-400">Loading market data…</div>
                  ) : marketData.length === 0 ? (
                    <div className="p-6 text-center text-slate-400">Unable to load market updates.</div>
                  ) : (
                    marketData.map((coin) => {
                      const change = coin.price_change_percentage_24h ?? 0;
                      const changeClass = change >= 0 ? 'text-emerald-300' : 'text-rose-300';
                      return (
                        <div key={coin.id} className="grid grid-cols-4 gap-4 px-4 py-4 text-sm text-slate-200 sm:grid-cols-4 sm:items-center">
                          <div className="flex items-center gap-3">
                            <img src={coin.image} alt={coin.name} className="h-8 w-8 rounded-full" />
                            <div>
                              <p className="font-semibold text-white">{coin.symbol.toUpperCase()}</p>
                              <p className="text-slate-500">{coin.name}</p>
                            </div>
                          </div>
                          <p>{formatCurrency(coin.current_price)}</p>
                          <p className={changeClass}>{change.toFixed(2)}%</p>
                          <p>{formatCurrency(coin.market_cap)}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Deposit request</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Manual funding options</h2>
                </div>
                <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                  Offline flow
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid gap-3">
                  {depositMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setDepositMethod(method)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        method === depositMethod
                          ? 'border-emerald-500/70 bg-emerald-500/10 text-white'
                          : 'border-slate-800 bg-slate-950/70 text-slate-300 hover:border-emerald-500/30 hover:bg-slate-900'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300">Amount to deposit</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(event) => setDepositAmount(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleDepositRequest}
                  className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Submit deposit request
                </button>
                {depositMessage && <p className="text-sm text-emerald-300">{depositMessage}</p>}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-400">
                  <p className="font-semibold text-white">How this works</p>
                  <p className="mt-2 leading-6">
                    The selected payment provider is used as a manual deposit request option. Once submitted, a team member can verify your transfer and credit your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Supported funding</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  JazzCash - manual transfer request and verification
                </li>
                <li className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  EasyPaisa - manual deposit request system
                </li>
                <li className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  Bank accounts - verify slip and update balance manually
                </li>
                <li className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                  Binance - crypto gateway support for transfers and settlements
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-400">Demo account</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Practice before trading live</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                A demo account gives users virtual buying power to test strategies without risk. Keep earnings in the demo wallet until you are ready to switch to live funds.
              </p>
              <div className="mt-6 rounded-3xl bg-slate-900/70 px-4 py-4 text-sm text-slate-200">
                <p className="font-medium text-white">Virtual balance</p>
                <p className="mt-1 text-3xl font-semibold text-emerald-300">{formatCurrency(demoBalance)}</p>
                <button
                  type="button"
                  onClick={() => setDemoBalance((current) => current + 2500)}
                  className="mt-4 w-full rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Add practice funds
                </button>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
          <h2 className="text-xl font-semibold text-white">Live deposit requests</h2>
          <div className="mt-4 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80">
            {depositRequests.length === 0 ? (
              <div className="p-6 text-slate-400">No deposit requests yet. Submit a request to begin.</div>
            ) : (
              <div className="divide-y divide-slate-800">
                {depositRequests.map((request) => (
                  <div key={request.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-white">{request.method}</p>
                      <p className="text-sm text-slate-400">{request.createdAt}</p>
                    </div>
                    <div className="text-sm text-slate-200">{formatCurrency(request.amount)}</div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-200">
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {year} Green Waves. Built for reliable manual deposits, demo trading, and fast market monitoring.
        </footer>
      </div>
    </div>
  );
}

export default App;
