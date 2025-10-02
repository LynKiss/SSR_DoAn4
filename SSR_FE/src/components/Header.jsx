const Header = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-industry text-white"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Hệ thống ERP</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <i className="fas fa-bell text-gray-500 text-lg cursor-pointer hover:text-blue-500"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-white text-sm"></i>
            </div>
            <span className="text-gray-700 font-medium" id="currentUser">
              {currentUser}
            </span>
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-red-500"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
