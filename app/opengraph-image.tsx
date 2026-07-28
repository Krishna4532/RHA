import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF8EF 0%, #FCE7C3 100%)',
          color: '#111111',
          fontSize: 56,
          fontFamily: 'Inter',
          fontWeight: 600,
          padding: 48,
        }}
      >
        Movement
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
