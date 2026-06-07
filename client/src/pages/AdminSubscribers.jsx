import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const token =
        localStorage.getItem("token");

     const response = await axios.get(
  `${API_URL}/api/subscribers`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setSubscribers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Subscribers
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-zinc-700">
          <thead>
            <tr className="bg-zinc-900">
              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {subscribers.map((subscriber) => (
              <tr
                key={subscriber._id}
                className="border-t border-zinc-700"
              >
                <td className="p-4">
                  {subscriber.email}
                </td>

                <td className="p-4">
                  {new Date(
                    subscriber.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscribers;