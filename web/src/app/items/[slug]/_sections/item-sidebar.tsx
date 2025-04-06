import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ClipboardCopyButton from "@/components/clipboard-copy-button";
import { Item } from "@/shared/models";
import { formatPrice, formatDate } from "@/lib/utils";
import { Heart, MessageCircle, Calendar, User, Trash } from "lucide-react";
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

  const handleContactSeller = () => {
    console.log("Contact seller", item.user!.id);
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
            <Button size="lg" className="w-full" onClick={handleContactSeller}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Написать продавцу
            </Button>
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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {user!.avatar ? (
              <Image
                width={90}
                height={90}
                src={user!.avatar}
                alt={user!.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-primary" />
            )}
          </div>
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
