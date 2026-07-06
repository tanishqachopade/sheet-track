import { landingContent } from "@/constants/landing";
import LoginButton from "@/components/auth/login-button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      
      <h1 className="text-xl font-bold">
        {landingContent.navbar.logo}
      </h1>

      <LoginButton />

    </nav>
  );
}