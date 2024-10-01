import dynamic from "next/dynamic";

const ClientSideNavbar = dynamic(() => import("./ClientSideNavbar"), {
  ssr: false,
});

export default function SideNavbar() {
  return <ClientSideNavbar />;
}
