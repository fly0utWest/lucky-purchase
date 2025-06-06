import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ClipboardCopyButton from "@/components/clipboard-copy-button";
import { Item } from "@/shared/models";
import { formatPrice, formatDate } from "@/lib/utils";
import { Heart, Calendar, User, Trash } from "lucide-react";
import { useFavorite } from "@/hooks/use-favorite";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/shared/providers/toast-provider";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useItems } from "@/hooks/use-items";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { env } from "@/env.mjs";
import { User2 } from "lucide-react";

interface ItemSidebarProps {
  item: Item;
}

export function ItemSidebar({ item }: ItemSidebarProps) {
  const { toggleFavorite, isFavorite } = useFavorite();
  const { authenticatedUser } = useAuthStore();
  const { toast } = useToast();
  const { deleteItem } = useItems();
  const router = useRouter();

  const isOwner = authenticatedUser?.id === item.user!.id;
  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFavorite(item.id);
  };

  const handleDeleteItem = async () => {
    try {
      await deleteItem(item.id);
      router.push("/catalog");
    } catch (error) {
      console.error("Не удалось удалить объявление", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{item.title}</h1>

            <p className="mt-2 text-3xl font-bold text-primary">
              {formatPrice(item.price)}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={isFavorite(item.id) ? "default" : "outline"}
                size="lg"
                onClick={handleFavoriteClick}
              >
                <Heart
                  className={cn(
                    "mr-2 h-5 w-5",
                    isFavorite(item.id) && "fill-current"
                  )}
                />
                {isFavorite(item.id) ? "В избранном" : "В избранное"}
              </Button>
              <ClipboardCopyButton />
            </div>
            {isOwner && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="lg" className="w-full">
                    <Trash className="mr-2 h-5 w-5" />
                    Удалить объявление
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Это действие нельзя отменить. Это навсегда удалит ваше
                      объявление.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteItem}>
                      Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </Card>
      <SellerCard user={item.user} />
    </div>
  );
}
interface SellerCardProps {
  user: Item["user"];
}
function SellerCard({ user }: SellerCardProps) {
  return (
    <Card>
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24 rounded-full">
            {user?.avatar === null ? null : (
              <AvatarImage
                src={`${env.NEXT_PUBLIC_STATIC_URL}/users/avatars/${user?.avatar}`}
              />
            )}
            <AvatarFallback className="rounded-full uppercase">
              <User2 />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user!.name}</h3>
            <p className="text-sm text-muted-foreground">Продавец</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>На площадке с {new Date(user!.createdAt).getFullYear()}</span>
        </div>
        <Button variant="outline" className="w-full" size="sm" asChild>
          <Link href={`/profile/${user!.id}`}>Все объявления пользователя</Link>
        </Button>
      </div>
    </Card>
  );
}
