import React from "react";
const person = ["women", "men"];
const UserOrdersDisplay = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100 dark:text-gray-300">
        <span>Users with most orders</span>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: "32rem" }}>
        <ul className="p-6 space-y-6">
          {data?.usersWithOrders.map((user) => {
            const { _id: userName, orders } = user;
            return (
              <li  className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src={`https://randomuser.me/api/portraits/${
                      person[Math.floor(Math.random() * person.length)]
                    }/${Math.floor(Math.random() * 100 + 10)}.jpg`}
                    alt={`${userName} profile picture`}
                  />
                </div>
                <span className="text-gray-600 dark:text-white">
                  {userName}
                </span>
                <span className="ml-auto font-semibold dark:text-white">
                  {orders}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default UserOrdersDisplay;
