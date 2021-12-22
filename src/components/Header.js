import Link from "next/link";

const navigation = [
  { name: "Mano vizitai", href: "/", doctor: true },
  { name: "Mano vizitai", href: "/", doctor: false },
  { name: "Receptai", href: "/prescription", doctor: false },
  { name: "Ligos istorija", href: "/visit/history", doctor: false },
  { name: "Mano duomenys", href: "/user", doctor: false },
  { name: "Mano pacientai", href: "/patients", doctor: true },
  { name: "Tyrimai", href: "/labtests", worker: true }
];

const viewMode = process.env.NEXT_PUBLIC_VIEW_MODE;

export default function Header() {
  const doctorMode = viewMode === "doctor" ? true : false;
  const workerMode = viewMode === "worker" ? true : false;

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <img
                className="h-10 w-auto link"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              />
            </Link>
            {doctorMode && !workerMode ? (
              <div className="hidden ml-10 space-x-8 lg:block">
                {navigation.map((link) =>
                  link.doctor === doctorMode ? (
                    <Link key={link.name} href={link.href}>
                      <a className="text-base font-medium text-white hover:text-indigo-50">
                        {link.name}
                      </a>
                    </Link>
                  ) : null
                )}
              </div>
            ) : null}
            {!doctorMode && workerMode ? (
              <div className="hidden ml-10 space-x-8 lg:block">
                {navigation.map((link) =>
                  link.worker === workerMode ? (
                    <Link key={link.name} href={link.href}>
                      <a className="text-base font-medium text-white hover:text-indigo-50">
                        {link.name}
                      </a>
                    </Link>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          <div className="ml-10 space-x-4">
            {!doctorMode && !workerMode ? (
              <Link href="/visit/new">
                <a
                  href="#"
                  className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Registruotis vizitui
                </a>
              </Link>
            ) : null}

            <a
              href="#"
              className="inline-block py-2 px-4 text-base font-medium text-white hover:text-indigo-50 "
            >
              Atsijungti
            </a>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) =>
            link.doctor === doctorMode ? (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-white hover:text-indigo-50"
              >
                {link.name}
              </a>
            ) : null
          )}
        </div>
      </nav>
    </header>
  );
}
