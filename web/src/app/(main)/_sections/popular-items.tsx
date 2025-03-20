import React from "react";

const PopularItems = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold">Популярные товары</h2>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">{children}</div>
    </section>
  );
};

export default PopularItems;
