import Image from 'next/image';

export default function LogoIcon() {
  return (
    <Image
      src="/disco_head_40x40.png"
      width={40}
      height={40}
      alt="Tiny disco boi"
    />
  );
}
