import Image from 'next/image';

export default function LogoIcon(props: React.ComponentProps<'image'>) {
  return (
    <Image
      className={ props.className }
      src="/disco_head_40x40.png"
      width={props.width}
      height={props.height}
      alt="Tiny disco boi"
    />
  );
}
