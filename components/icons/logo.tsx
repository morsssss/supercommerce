import Image from 'next/image';

export default function LogoIcon({ className } : { className : string }) {
  return (
    <Image
      className={ className }
      src="/disco_head_40x40.png"
      width={40}
      height={40}
      alt="Tiny disco boi"
    />
  );
}
