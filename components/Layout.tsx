import Navigation from "./Navigation";
type Props = {
  children?: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <Navigation />
      <main className="container mt-2">{children}</main>
    </>
  );
}
