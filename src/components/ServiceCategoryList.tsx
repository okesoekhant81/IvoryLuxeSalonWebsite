import type { ServiceCategory } from "@/lib/services";

export default function ServiceCategoryList({ categories }: { categories: ServiceCategory[] }) {
  return (
    <div className="space-y-14">
      {categories.map((category) => (
        <div key={category.title}>
          <h2 className="font-serif-italic text-2xl text-black md:text-3xl">{category.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {category.description}
          </p>
          <div className="mt-6 divide-y divide-dashed divide-black/10">
            {category.items.map((item) => (
              <div key={item.name} className="flex items-baseline justify-between gap-6 py-3">
                <span className="text-sm text-black md:text-base">{item.name}</span>
                <span className="whitespace-nowrap font-serif-italic text-sm text-brown md:text-base">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
