import Link from "next/link";
export default function Navigation() {
  return (
    <header className="flex  h-20 bg-indigo-900  text-white">
      <div className="container flex items-center">
        <div className="flex">
          <Link href="/">
            <a className="text-2xl font-medium text-white">Pokemon Browser</a>
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1 text-white"></div>
        <div className=" flex items-center justify-end flex-1 text-white">
          <Link href="/about">
            <a className="text-base font-medium text-white">About</a>
          </Link>
        </div>
      </div>
    </header>
  );
}
