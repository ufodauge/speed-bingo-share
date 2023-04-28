import ThemeToggler from "./ThemeToggler";
import HeaderTitle from "./HeaderTitle";

export default function AppHeader() {
  return (
    <div className="navbar bg-neutral">
      <div className="navbar-start px-6">
        <HeaderTitle />
      </div>

      <div className="navbar-end px-3">
        <ThemeToggler />
      </div>
    </div>
  );
}
