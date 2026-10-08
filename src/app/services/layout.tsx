import ServiceSearchAutoOpen from "../../components/ServiceSearchAutoOpen";
import SelectedServicesSummary from "./SelectedServicesSummary";
export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-[72px] lg:pt-[76px] xl:pt-0"><ServiceSearchAutoOpen />{children}<SelectedServicesSummary /></div>;
}