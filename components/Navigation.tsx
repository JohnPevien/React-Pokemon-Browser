import Link from "next/link";
type Props = {};
export default function Navigation({}: Props) {
  return (
    <header className="flex h-20 bg-indigo-900">
      <div className="flex items-center justify-center flex-1 text-white">
        <Link href="/">
          <a className="text-4xl font-medium text-white">Pokemon Browser</a>
        </Link>
      </div>
    </header>
  );
}
