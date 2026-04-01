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
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
  const {
    data: users = [],
    refetch,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["all-users-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/all-users");
      return res.data;
    },
  });
  const handleUserRole = async (id, role) => {
    setChangeStatusLoading(true);
    await axiosSecure
      .patch(`/api/update-user-role/${id}`, {
        role: role,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          setChangeStatusLoading(false);
          refetch();
        }
      });
  };
  if (userLoading || changeStatusLoading)
    return <LoadingSpinner></LoadingSpinner>;
  return (
    <div>
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="text-muted-foreground">
        Manage all user accounts on the platform
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10" />
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
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id} className="bg-card">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.photoURL}
                      alt=""
                      className="flex h-12 w-12  items-center justify-center rounded-full object-cover"
                    />

                    <span className="font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">
                  <Select
                    value={u.role}
                    onValueChange={(val) => handleUserRole(u._id, val)}
                  >
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="tutor">Tutor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
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
