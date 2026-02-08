'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string[]>([
    '> Auctobot Terminal v1.0.0',
    '> AI-Powered On-Chain Trading Assistant',
    '> Type your command or use the buttons below',
    '',
  ]);

  const executeCommand = async (command: string) => {
    setOutput(prev => [...prev, `$ ${command}`, '> Processing...']);
    setLoading(true);

    try {
      const response = await fetch('/api/bankr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: command }),
      });

      const data = await response.json();
      
      if (data.success) {
        setOutput(prev => [...prev, `> ${data.result}`, '']);
      } else {
        setOutput(prev => [...prev, `> Error: ${data.error}`, '']);
      }
    } catch (error) {
      setOutput(prev => [...prev, `> Error: ${error}`, '']);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      executeCommand(prompt.trim());
    }
  };

  const quickCommand = (cmd: string) => {
    executeCommand(cmd);
  };

  return (
    <main className="min-h-screen p-8 scanline">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-green-500/30 pb-4">
          <h1 className="text-4xl font-bold mb-2 glitch">
            🐙 AUCTOBOT TERMINAL
          </h1>
          <p className="text-green-500/70 text-sm">
            Autonomous Trading Assistant | Base Chain | v1.0.0
          </p>
        </div>

        {/* Main Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Terminal Output */}
          <div className="lg:col-span-2">
            <div className="terminal-panel h-[500px] overflow-y-auto font-mono text-sm">
              {output.map((line, i) => (
                <div key={i} className="mb-1">
                  {line}
                </div>
              ))}
              {loading && (
                <div className="animate-pulse">
                  <span className="text-yellow-400">█</span>
                </div>
              )}
            </div>

            {/* Command Input */}
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <span className="terminal-prompt">$</span>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
                className="flex-1 terminal-input"
                placeholder="Enter command (e.g., 'buy $100 of ETH')"
                autoFocus
              />
            </form>
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            {/* Wallet Status */}
            <div className="terminal-panel">
              <h3 className="text-lg font-bold mb-3 text-green-400">WALLET</h3>
              <button className="terminal-button w-full mb-2">
                Connect Wallet
              </button>
              <div className="text-xs text-green-500/50 mt-2">
                <div>Status: Disconnected</div>
                <div>Network: Base</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="terminal-panel">
              <h3 className="text-lg font-bold mb-3 text-green-400">QUICK ACTIONS</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => quickCommand('What is my portfolio?')}
                  className="terminal-button"
                  disabled={loading}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => quickCommand('Show recent transactions')}
                  className="terminal-button"
                  disabled={loading}
                >
                  History
                </button>
                <button
                  onClick={() => quickCommand('What is the price of ETH?')}
                  className="terminal-button"
                  disabled={loading}
                >
                  ETH Price
                </button>
                <button
                  onClick={() => quickCommand('Show gas prices')}
                  className="terminal-button"
                  disabled={loading}
                >
                  Gas
                </button>
              </div>
            </div>

            {/* Trading Presets */}
            <div className="terminal-panel">
              <h3 className="text-lg font-bold mb-3 text-green-400">TRADE PRESETS</h3>
              <div className="space-y-2">
                <button
                  onClick={() => quickCommand('Buy $50 of ETH on Base')}
                  className="terminal-button w-full text-left"
                  disabled={loading}
                >
                  → Buy $50 ETH
                </button>
                <button
                  onClick={() => quickCommand('Buy $100 of USDC on Base')}
                  className="terminal-button w-full text-left"
                  disabled={loading}
                >
                  → Buy $100 USDC
                </button>
                <button
                  onClick={() => quickCommand('Swap 0.1 ETH to USDC on Base')}
                  className="terminal-button w-full text-left"
                  disabled={loading}
                >
                  → Swap 0.1 ETH
                </button>
              </div>
            </div>

            {/* Strategy Control */}
            <div className="terminal-panel">
              <h3 className="text-lg font-bold mb-3 text-green-400">STRATEGY</h3>
              <div className="space-y-2">
                <button className="terminal-button w-full">
                  Start Auto-Trade
                </button>
                <button className="terminal-button w-full">
                  Stop Auto-Trade
                </button>
                <button className="terminal-button w-full">
                  View Stats
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-8 border-t border-green-500/30 pt-4 text-xs text-green-500/50">
          <div className="flex justify-between">
            <div>Chain: Base | Block: Loading...</div>
            <div>Gas: -- gwei | Status: Ready</div>
          </div>
        </div>
      </div>
    </main>
  );
}
