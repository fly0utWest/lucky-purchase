import React from "react";

const RecentItems = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-muted/30 py-12 rounded-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Последние объявления
        </h2>
        <div className="grid auto-rows-min gap-6 md:grid-cols-3">
          {children}
        </div>
      </div>
    </section>
  );
};

export default RecentItems;
