import { useState } from "react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Trash2, Edit, Search } from "lucide-react";
import { toast } from "sonner";

const initialUsers = [
  {
    id: 1,
    name: "Ahmed Rahman",
    email: "ahmed@example.com",
    role: "Student",
    status: "Active",
    avatar: "AR",
    phone: "+880 1712-345678",
  },
  {
    id: 2,
    name: "Dr. Rafiq Ahmed",
    email: "rafiq@example.com",
    role: "Tutor",
    status: "Active",
    avatar: "RA",
    phone: "+880 1812-345678",
  },
  {
    id: 3,
    name: "Fatima Khan",
    email: "fatima@example.com",
    role: "Tutor",
    status: "Active",
    avatar: "FK",
    phone: "+880 1912-345678",
  },
  {
    id: 4,
    name: "Kamal Uddin",
    email: "kamal@example.com",
    role: "Student",
    status: "Inactive",
    avatar: "KU",
    phone: "+880 1612-345678",
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    role: "Student",
    status: "Active",
    avatar: "NJ",
    phone: "+880 1512-345678",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    toast.success("User role updated.");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User deleted.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="text-muted-foreground">
        Manage all user accounts on the platform
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                User
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Email
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Role
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((u) => (
              <tr key={u.id} className="bg-card">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {u.avatar}
                    </div>
                    <span className="font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">
                  <Select
                    defaultValue={u.role}
                    onValueChange={(v) => handleRoleChange(u.id, v)}
                  >
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Tutor">Tutor</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(u.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
