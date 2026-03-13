import type { Category } from "../types"

interface Props {
  selectedCategory: Category | null
  onCategoryChange: (category: Category | null) => void
}

export default function CategoryFilters({
  selectedCategory,
  onCategoryChange,
}: Props) {
  const categories: Category[] = ["Interior", "Exterior", "Industrial"]

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded ${
          selectedCategory === null
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        Todas
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded ${
            selectedCategory === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
