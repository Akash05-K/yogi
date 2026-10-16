'use client';

export function Wheel() {
  return (
    <img
      className="zodiac-wheel zodiac-wheel--image"
      src="/images/zodiac-mandala.png"
      alt=""
      aria-hidden="true"
      width={1254}
      height={1254}
      draggable={false}
      fetchPriority="high"
    />
  );
}