import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { SelectProps } from "@radix-ui/react-select"

import { useGetCategories } from "@/hooks/useCategories"
import CategoryWithLink from "./CategoryLink"

function CategorySelect({ onValueChange, defaultValue }: SelectProps): React.ReactNode {
    const { data: categories } = useGetCategories()

    if (!categories) return <span>Loading</span>

    return (
        <Select onValueChange={onValueChange} defaultValue={defaultValue}>
            <SelectTrigger>
                <SelectValue className="text-black" placeholder='Choose a category' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {categories.map(category => (
                        <SelectItem key={category.id} value={`${category.id}`}>
                            <CategoryWithLink category={category} />
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CategorySelect