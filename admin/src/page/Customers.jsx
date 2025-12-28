import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchUsers = async () => {
    const { data } = await axios.get(
      `${API_URL}/users?search=${search}&page=${page}&limit=6`
    );

    setUsers(data.users);
    setPages(data.pagination.pages);
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  return (
    <div className="min-h-screen bg-[#faf7f2] p-8">
      <h1 className="text-3xl font-semibold mb-6">Customers</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full p-3 mb-6 rounded-xl border focus:outline-none"
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={u.image || "/avatar.png"}
                alt={u.fullName}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="font-medium text-lg">
                  {u.fullName || "No Name"}
                </h2>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Joined: {new Date(u.createdAt).toDateString()}
            </p>
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {[...Array(pages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === i + 1
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
