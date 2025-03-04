import HeaderClient from "./HeaderClient";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    // <RoleRedirect>
    <HeaderClient session={session} />
    // </RoleRedirect>
  );
}
