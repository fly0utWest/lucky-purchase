import React from "react";

const RecentItems = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold">Последние объявления</h2>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">{children}</div>
    </section>
  );
};

export default RecentItems;
