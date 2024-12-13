import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // Add User
  const addUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([
      ...users,
      { id: Date.now(), name: newUser.name, email: newUser.email },
    ]);
    setNewUser({ name: "", email: "" });
  };

  // Update User
  const updateUser = () => {
    if (!editingUser) return;
    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
  };

  // Delete User
  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {/* Add User Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mr-2 rounded"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mr-2 rounded"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button
          onClick={addUser}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* User Table */}
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">
                <button
                  onClick={() => setEditingUser(user)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Form */}
      {editingUser && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Edit User</h2>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 mr-2 rounded"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mr-2 rounded"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <button
            onClick={updateUser}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditingUser(null)}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
