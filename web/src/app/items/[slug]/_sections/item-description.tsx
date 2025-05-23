import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Item } from "@/shared/models";
import { formatDate } from "@/lib/utils";

interface ItemDetailsProps {
  item: Item;
}

export function ItemDetails({ item }: ItemDetailsProps) {
  return (
    <Card>
      <div className="space-y-6 p-6">
        <div>
          <h2 className="text-xl text-primary font-semibold">Описание</h2>
          {item.description ? (
            <p className="mt-4 whitespace-pre-wrap text-muted-foreground">
              {item.description}
            </p>
          ) : (
            <p className="mt-4 text-muted-foreground italic">
              Описание отсутствует
            </p>
          )}
        </div>
        <Separator />
        <div>
          <h2 className="text-xl text-primary font-semibold">Характеристики</h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-secondary-foreground">ID товара</dt>
              <dd className="text-muted-foreground">{item.id}</dd>
            </div>
            <div>
              <dt className="text-sm text-secondary-foreground">Дата публикации</dt>
              <dd className="text-muted-foreground">
                {formatDate(item.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-secondary-foreground">Категория</dt>
              <dd className="text-muted-foreground">{item.category?.name}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Card>
  );
}
