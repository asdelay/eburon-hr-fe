import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <Link
      href="/"
      className="text-center fixed left-2 top-2 bg-black/90 cursor-pointer p-1 rounded-full z-100"
    >
      <Image
        src="/icon-eburon.svg"
        alt="Eburon Logo"
        className="opacity-90"
        width={48}
        height={48}
        loading="eager"
      />
    </Link>
  );
};

export default Header;
