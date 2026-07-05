import { landingContent } from "@/constants/landing";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5">
      
      <h1 className="text-xl font-bold">
        {landingContent.navbar.logo}
      </h1>

      <button className="
        rounded-lg
        border
        px-4
        py-2
        hover:bg-gray-100
      ">
        {landingContent.navbar.loginText}
      </button>

    </nav>
  );
}