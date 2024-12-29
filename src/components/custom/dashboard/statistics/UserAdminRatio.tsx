import { useGetAllUsers } from "@/hooks/auth.hooks";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomLoading from "../../post/CustomLoading";

const UserAdminRatio = () => {
  const { data: users, isFetching, isLoading } = useGetAllUsers();

  const admins = users && users?.filter((user) => user.role === "admin").length;
  const regularUsers =
    users && users.filter((user) => user.role === "user").length;

  const data = [
    { name: "Regular Users", value: regularUsers, color: "#4f46e5" },
    { name: "Administrators", value: admins, color: "#ec4899" },
  ];

  const totalUsers = users?.length;

  if (isFetching || isLoading) {
    return (
      <div className="w-full h-full">
        <CustomLoading />
      </div>
    );
  }
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg lg:ms-6 p-6 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">User Distribution</h2>
            <p className="text-gray-500 text-sm">Total Users: {totalUsers}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <div className="flex flex-col lg:flex-row  ">
          <div className="w-full lg:w-[70%]">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-2 shadow-lg rounded-lg border">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm">
                              Count: {data.value}
                              <span className="ml-2">
                                ({((data.value / totalUsers) * 100).toFixed(1)}
                                %)
                              </span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-sm text-gray-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full lg:w-[30%] mt-4 grid grid-cols-1 gap-4">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex flex-col p-3 rounded-lg"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-xl font-semibold">{item.value}</span>
                <span className="text-sm text-gray-500">
                  {((item.value / totalUsers) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAdminRatio;
