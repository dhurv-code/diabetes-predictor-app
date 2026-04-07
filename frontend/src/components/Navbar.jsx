import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">AI Health App</h1>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/history">History</Link>
      </div>
    </div>
  );
}

export default Navbar;