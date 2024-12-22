import React from "react";
const userImages = [
  "women/82.jpg",
  "men/81.jpg",
  "men/80.jpg",
  "men/79.jpg",
  "women/78.jpg",
  "women/77.jpg",
  "men/76.jpg",
  "men/75.jpg",
];
const UserOrdersDisplay = ({data}) => {
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
              <li className="flex items-center">
                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src={`https://randomuser.me/api/portraits/${
                      userImages[Math.floor(Math.random() * userImages.length)]
                    }`}
                    alt={`${userName} profile picture`}
                  />
                </div>
                <span className="text-gray-600 dark:text-white">{userName}</span>
                <span className="ml-auto font-semibold dark:text-white">{orders}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default UserOrdersDisplay;
