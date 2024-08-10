import Image from 'next/image';

export default function LogoIcon(props:any) {

  return (
    <Image
      className={props.className}
      src="/disco_head_40x40.png"
      alt="Tiny disco boi"
      {...props}
    />
  );
}
