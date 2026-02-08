# 🐙 Auctobot Terminal

AI-powered on-chain trading assistant for Base blockchain.

## Features

- 🔐 **Privy Auth** - Email, social login, or wallet connection
- 🦾 **Bankr Integration** - Natural language trading via AI
- 💻 **Terminal UI** - Retro green terminal aesthetic  
- 📊 **Quick Actions** - Pre-configured trading buttons
- 🤖 **Auto-Trading** - Autonomous strategy execution (coming soon)
- 🔄 **WalletConnect** - Easy wallet switching

## Stack

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Auth:** Privy (email/social/wallet login)
- **Trading:** Bankr API
- **Blockchain:** Base (via wagmi + viem)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local`:

```bash
# Privy (get from https://privy.io)
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Bankr API (get from Bankr)
NEXT_PUBLIC_BANKR_API_KEY=your_public_key
BANKR_API_KEY=your_secret_key

# Base Chain
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

### Natural Language Trading

Type commands in the terminal:

```
> buy $100 of ETH
> swap 0.5 ETH to USDC
> what is my portfolio?
> show recent transactions
```

### Quick Actions

Use the sidebar buttons for common operations:
- Portfolio overview
- Transaction history
- Price checks
- Gas prices
- Pre-configured trades

### Auto-Trading (Coming Soon)

- Define strategy rules
- Set risk parameters
- Let Auctobot execute 24/7

## Architecture

```
User → Terminal UI → Bankr API → Base Chain
         ↓
    Privy Auth (wallet/email)
```

### API Routes

- `POST /api/bankr` - Execute trading command via Bankr

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard.

## Development

```bash
# Type checking
npm run build

# Lint
npm run lint
```

## Security

- API keys stored in environment variables
- Bankr API key never exposed to client
- Privy handles wallet security
- All transactions require user confirmation

## Roadmap

- [x] Terminal UI
- [x] Privy auth integration
- [x] Bankr API integration
- [ ] WalletConnect support
- [ ] Auto-trading strategies
- [ ] P&L tracking
- [ ] Trade history visualization
- [ ] Multi-wallet support
- [ ] Mobile responsive
- [ ] Dark/Light themes

## License

MIT

---

Built by Pattern Integrity Films & Auctobot 🐙
