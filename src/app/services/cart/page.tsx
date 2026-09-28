import type { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
  title: "Your Services | City Coolies",
};

export default function Page() {
  return <CartPage />;
}
