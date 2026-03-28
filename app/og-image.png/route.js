import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#E8D1AA',
          padding: 34,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 36,
            border: '4px solid #6D3921',
            background: '#F8F1E1',
            display: 'flex',
            padding: 48,
            gap: 42,
          }}
        >
          <div
            style={{
              width: 548,
              height: '100%',
              borderRadius: 26,
              background: '#6D3921',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 484,
                height: 398,
                borderRadius: 18,
                background: '#F2E6CF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 24,
                padding: '0 46px',
              }}
            >
              <div style={{ width: 240, height: 24, borderRadius: 12, background: '#6D3921' }} />
              <div style={{ width: 320, height: 24, borderRadius: 12, background: '#A24A2A' }} />
              <div style={{ width: 348, height: 24, borderRadius: 12, background: '#46563D' }} />
              <div style={{ width: 268, height: 24, borderRadius: 12, background: '#B7893C' }} />
              <div style={{ width: 182, height: 24, borderRadius: 12, background: '#6D3921' }} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#2C241D',
              flex: 1,
            }}
          >
            <div style={{ fontSize: 88, fontWeight: 800 }}>BlockTodo</div>
            <div style={{ fontSize: 34, color: '#5D5145', marginTop: 20 }}>Chain-backed task keeping on Base</div>
            <div style={{ fontSize: 28, color: '#A24A2A', marginTop: 36 }}>
              Vintage utility. Multiple pages. Wallet-ready.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
