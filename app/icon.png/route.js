import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 1024,
  height: 1024,
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
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F2E6CF',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 832,
            height: 832,
            borderRadius: 84,
            background: '#6D3921',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 672,
              height: 672,
              borderRadius: 52,
              background: '#F8F1E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6D3921',
              fontSize: 220,
              fontWeight: 800,
            }}
          >
            BT
          </div>
        </div>
      </div>
    ),
    size,
  )
}
