import Link from "next/link";

const BottomNav = () => {
  const navItems = [
    {
      label: "Weigh Ins",
      href: "/weighIns",
    },
    {
      label: "Add weigh in",
      href: "/weighIns/add",
    },
    {
      label: "Goal",
      href: "/goals",
    },
  ];
  return (
    <nav className="fixed right-0 bottom-0 left-0 bg-green-200 h-12 p-2 flex justify-around">
      {navItems.map((navItem) => (
        <Link href={navItem.href} key={navItem.label}>
          {navItem.label}
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
