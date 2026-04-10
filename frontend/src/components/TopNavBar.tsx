
type TopNavBarProps = {
    items: number
}

export function TopNavBar({ items }: TopNavBarProps) {
  return (
    <nav className="bg-gray-800 p-1">   
    <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-white text-1xl font-bold">Bara Bara Watch</h1>
        <input
          type="text"
          placeholder="Search..."
          className="ml-4 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="ml-auto flex items-center space-x-4">
          <p className="text-white">Available povs: {items} / 4</p>
        </div>
    </nav>
  );
}