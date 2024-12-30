import React from "react";
const person = ["women", "men"];
const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
const UserOrdersDisplay = ({ data }) => {
  return (
    <>
      <header
        className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100 dark:text-gray-300"
        role="heading"
        aria-level="1"
      >
        <span>Users with most orders</span>
      </header>
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "32rem" }}
        role="region"
        aria-labelledby="user-orders-title"
      >
        <ul className="p-6 space-y-6" id="user-orders-title">
          {data?.usersWithOrders?.length > 0 ? (
            data.usersWithOrders.map((user) => {
              const { _id: userName, orders } = user;
              return (
                <li
                  key={userName}
                  className="flex items-center"
                  role="listitem"
                  aria-label={`${userName} with ${orders} orders`}
                >
                  <div
                    className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden"
                    role="img"
                    aria-label={`${userName}'s profile picture`}
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        person[Math.floor(Math.random() * person.length)]
                      }/${Math.floor(Math.random() * 100 + 10)}.jpg`}
                      alt={`${userName}'s profile picture`}
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                    />
                  </div>
                  <span
                    className="text-gray-600 dark:text-white"
                    aria-label={`User name: ${userName}`}
                  >
                    {userName}
                  </span>
                  <span
                    className="ml-auto font-semibold dark:text-white"
                    aria-label={`Number of orders: ${orders}`}
                  >
                    {orders}
                  </span>
                </li>
              );
            })
          ) : (
            <p className="text-gray-500 dark:text-gray-300" aria-live="polite">
              No orders found.
            </p>
          )}
        </ul>
      </div>
    </>
  );
};

export default UserOrdersDisplay;
