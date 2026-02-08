import { NextRequest, NextResponse } from 'next/server';
import { getServerBankrClient } from '@/lib/bankr';

export async function POST(request: NextRequest) {
  try {
    const { prompt, walletAddress } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get Bankr client
    const client = getServerBankrClient();

    // Execute with polling
    const result = await client.executeWithPolling(prompt, walletAddress);

    if (result.status === 'error') {
      return NextResponse.json({
        success: false,
        error: result.error || 'Unknown error',
      });
    }

    return NextResponse.json({
      success: true,
      result: JSON.stringify(result.result, null, 2),
    });
  } catch (error) {
    console.error('Bankr API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
