import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Item } from "@/shared/models";

interface ItemBreadcrumbsProps {
  item: Item;
}

export function ItemBreadcrumbs({ item }: ItemBreadcrumbsProps) {
  return (
    <Breadcrumb className="p-2 mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Главная</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{item.title}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
