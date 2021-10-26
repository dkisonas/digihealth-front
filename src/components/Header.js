function Header() {
  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center bg-digihealth_blue p-1 flex-grow py-2">
        <div className="flex text-sm text-gray-300 mx-5">Jonas Jonaitis</div>

        <div className="text-white flex items-center text-lg space-x-20 mx-auto whitespace-nowrap">
          <div className="link">
            <p>Mano vizitai</p>
          </div>

          <div className="link">
            <p>Receptai</p>
          </div>
          <div className="link">
            <p>Ligos istorija</p>
          </div>
          <div className="link">
            <p>Mano duomenys</p>
          </div>
        </div>

        {/* Right */}
        <div className="text-white flex items-center space-x-6 mx-10 whitespace-nowrap">
          <a
            className="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white text-lg"
            href="#"
          >
            Registruotis vizitui
          </a>

          <div className="link">
            <p>Atsijungti</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
