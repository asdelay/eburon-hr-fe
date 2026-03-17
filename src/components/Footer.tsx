import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-4 bg-white/5 border border-white/30  w-full flex flex-col items-center p-8 rounded-t-3xl text-white/50">
      <p className="font-semibold">
        © Eburon {new Date().getFullYear()} | All rights reserved
      </p>
      <div className="flex justify-between w-full max-w-4xl mt-8">
        <div className="flex flex-col items-start">
          <p>Boterstraat 36, Ieper, Belgium</p> <p>mail@eburon.ai</p>
        </div>
        <div className="flex flex-col items-end">
          <Link
            href="terms-of-use"
            className="duration-150 hover:text-white/70"
          >
            Terms of Use
          </Link>{" "}
          <Link
            className="duration-150 hover:text-white/70"
            href="privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <div></div>
    </footer>
  );
};

export default Footer;
