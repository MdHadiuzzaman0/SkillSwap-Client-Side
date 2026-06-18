import Link from 'next/link';
import NavLink from '@/components/NavLink';
import NavbarRight from '@/components/NavbarRight';
import { getUserInfo } from '@/lib/data';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from 'next/image';

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const user = session?.user;
  const userInfo = await getUserInfo(user?.email);
  // console.log(userInfo, session)

  return (
    <div className="navbar px-6 fixed lg:sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-[#E5E4EA]/60 font-body">

      {/* Brand Logo - SkillSwap */}
      <div className="navbar-start">
  <Link href="/" className="flex items-center gap-3 cursor-pointer select-none group">
    {/* Added "relative" to the parent div so the filled image stays inside this box */}
    <div className="relative w-11 h-11 bg-white border border-[#E5E4EA] rounded-xl flex items-center justify-center p-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all group-hover:scale-105 duration-300">
      <Image
        src="https://img.icons8.com/plasticine/100/home-office.png" 
        alt="SkillSwap Logo" 
        fill
        sizes="44px" // Optimizes performance for small layout sizes
        className="object-contain p-1" // Keeping the padded logo clean and contained
      />
    </div>

    <span className="font-heading font-extrabold text-2xl tracking-tight text-[var(--color-black)]">
      Skill<span className="text-[var(--color-tan)]">Swap</span>
    </span>
  </Link>
</div>

      {/* Public Routes Only */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-3">
          <li><NavLink href="/">Home</NavLink></li>
          <li><NavLink href="/browse-tasks">Browse Tasks</NavLink></li>
          <li><NavLink href="/browse-freelancers">Freelancers</NavLink></li>
        </ul>  
      </div>

      <div className="navbar-end">
        <NavbarRight session={session}  userInfo={userInfo}/>
      </div>

    </div>
  );
}