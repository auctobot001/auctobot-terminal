# Auctobot Terminal - Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/auctobot001/auctobot-terminal)

### Option 2: Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd auctobot-terminal
vercel --prod
```

## 🔑 Required Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### 1. Privy (Auth Provider)

Get from: https://dashboard.privy.io/

```
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
```

**Setup Steps:**
1. Go to https://privy.io
2. Create account
3. Create new app: "Auctobot Terminal"
4. Copy App ID
5. Configure: 
   - Login methods: Email, Google, Twitter, Discord, Wallet
   - Embedded wallets: Enabled
   - Default chain: Base (8453)

### 2. Bankr API (Trading Backend)

Get from: Bankr team

```
NEXT_PUBLIC_BANKR_API_KEY=your_public_key
BANKR_API_KEY=your_secret_key
```

**Note:** Two keys needed:
- `NEXT_PUBLIC_*` = Exposed to frontend
- `BANKR_API_KEY` = Server-side only (secret)

### 3. Base Chain (Built-in)

```
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

## ✅ Verify Deployment

After deploying, test:

1. **Auth:** Click "Connect Wallet" → Should show Privy modal
2. **Trading:** Type `what is the price of ETH?` → Should execute via Bankr
3. **Quick Actions:** Click any button → Should work

## 🔧 Post-Deployment Configuration

### Privy Dashboard

1. Go to https://dashboard.privy.io/
2. Navigate to your app
3. Add your Vercel URL to **Allowed origins**:
   - `https://your-app.vercel.app`
   - `https://your-custom-domain.com` (if using custom domain)

### Custom Domain (Optional)

In Vercel Dashboard:
1. Go to Settings → Domains
2. Add your domain: `terminal.auctobot.com`
3. Configure DNS (Vercel provides instructions)

## 🔐 Security Checklist

- [ ] Privy App ID is correct
- [ ] Bankr API keys are set (both public & secret)
- [ ] Secret keys are NOT in source code
- [ ] Vercel URL added to Privy allowed origins
- [ ] Environment variables are in "Production" scope
- [ ] Test with real wallet before announcing

## 🐛 Troubleshooting

### "Privy is not configured"
- Check `NEXT_PUBLIC_PRIVY_APP_ID` is set in Vercel
- Redeploy after adding env vars

### "Bankr API error"
- Verify both `NEXT_PUBLIC_BANKR_API_KEY` and `BANKR_API_KEY` are set
- Check API keys are valid
- Ensure Base chain is supported by your Bankr account

### "Wallet won't connect"
- Add Vercel URL to Privy allowed origins
- Check browser console for errors
- Try different wallet (MetaMask vs Coinbase)

## 📊 Monitoring

Vercel provides built-in monitoring:
- **Analytics:** Traffic, performance
- **Logs:** API errors, function logs
- **Speed Insights:** Page load times

Access via: Vercel Dashboard → Your Project → Analytics

## 🔄 Updates

To deploy updates:

```bash
git add .
git commit -m "Update: description"
git push origin main
```

Vercel auto-deploys on push to `main` branch.

## 💰 Costs

**Vercel:**
- Free tier: 100GB bandwidth/month
- Hobby: $0 (sufficient for testing)
- Pro: $20/month (for production)

**Privy:**
- Free: Up to 1000 MAU
- Growth: $99/month (up to 10k MAU)

**Bankr:**
- Contact Bankr team for pricing

---

**Live URL:** https://auctobot-terminal.vercel.app (after deployment)

**GitHub:** https://github.com/auctobot001/auctobot-terminal

🐙 **Ready to trade!**
