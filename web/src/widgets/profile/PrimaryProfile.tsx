import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { env } from "@/env.mjs";
import { PublicUser, AuthenticatedUser } from "@/shared/models";

interface PrimaryProfileProps {
  user: PublicUser | AuthenticatedUser;
}

const PrimaryProfile: React.FC<PrimaryProfileProps> = ({ user }) => {
  return (
    <section className="">
        <Avatar className="w-24 h-24">
          <AvatarImage
            className="object-cover object-center w-full h-full"
            src={`${env.NEXT_PUBLIC_STATIC_URL}/avatars/${user?.avatar}`}
          />
          <AvatarFallback className="text-2xl font-bold capitalize">
            {user?.name[0]}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">
          {user ? user.name : "Пользователь"}
        </h2>
        <p className="text-gray-500">ivan@example.com</p>
        {/* <Button onClick={() => setEditMode(!editMode)}>
          Редактировать профиль
        </Button> */}
    </section>
  );
};

export default PrimaryProfile;
