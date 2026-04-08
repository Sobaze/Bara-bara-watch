

export function TopNavBar() {
  return (
    <nav className="bg-gray-800 p-4">   
        <h1 className="text-white text-2xl font-bold">Bara Bara Watch</h1>
        <input
          type="text"
          placeholder="Search..."
          className="ml-4 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </nav>
  );
}