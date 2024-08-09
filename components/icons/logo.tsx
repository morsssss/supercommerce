import Image from 'next/image';

export default function LogoIcon(props:object) {

  return (
    <Image
      src="/disco_head_40x40.png"
      alt="Tiny disco boi"
      {...props}
    />
  );
}
