// Bankr API Integration
// Based on Bankr Terminal implementation

const BANKR_API_URL = 'https://api.bankr.sh/v1';

export interface BankrRequest {
  prompt: string;
  walletAddress?: string;
}

export interface BankrResponse {
  status: 'pending' | 'success' | 'error';
  transactionId?: string;
  result?: any;
  error?: string;
}

export class BankrClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async submitPrompt(request: BankrRequest): Promise<BankrResponse> {
    const response = await fetch(`${BANKR_API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Bankr API error: ${response.statusText}`);
    }

    return response.json();
  }

  async pollStatus(transactionId: string): Promise<BankrResponse> {
    const response = await fetch(`${BANKR_API_URL}/status/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Bankr API error: ${response.statusText}`);
    }

    return response.json();
  }

  async executeWithPolling(prompt: string, walletAddress?: string): Promise<BankrResponse> {
    // Submit
    const submission = await this.submitPrompt({ prompt, walletAddress });
    
    if (!submission.transactionId) {
      throw new Error('No transaction ID returned');
    }

    // Poll until complete
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const status = await this.pollStatus(submission.transactionId);
      
      if (status.status === 'success' || status.status === 'error') {
        return status;
      }
      
      attempts++;
    }

    throw new Error('Transaction timeout');
  }
}

// Server-side client (uses API key from env)
export function getServerBankrClient(): BankrClient {
  const apiKey = process.env.BANKR_API_KEY;
  if (!apiKey) {
    throw new Error('BANKR_API_KEY not configured');
  }
  return new BankrClient(apiKey);
}
