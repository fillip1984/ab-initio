import Link from "next/link";
import { IoScaleOutline } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { GiStairsGoal } from "react-icons/gi";

const BottomNav = () => {
  const navItems = [
    {
      label: "Weigh Ins",
      icon: <IoScaleOutline />,
      href: "/weighIns",
    },
    {
      label: "Add weigh in",
      icon: <BsPlus />,
      href: "/weighIns/add",
    },
    {
      label: "Goal",
      icon: <GiStairsGoal />,
      href: "/goals",
    },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex h-12 items-center justify-around bg-green-200 py-12">
      {navItems.map((navItem) => (
        <Link href={navItem.href} key={navItem.label} className="text-4xl">
          {navItem.icon}
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
