import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { SelectProps } from "@radix-ui/react-select"

import { useGetCategories } from "@/hooks/useCategories"
import CategoryWithLink from "./CategoryLink"

function CategorySelect({ onValueChange, defaultValue, ...props }: SelectProps): React.ReactNode {
    const { data: categories, isFetched } = useGetCategories()

    if (!categories) return <span>Loading...</span>

    if (isFetched && !categories.length) return <span>No categories are available</span>

    return (
        <Select onValueChange={onValueChange} defaultValue={defaultValue} {...props}>
            <SelectTrigger>
                <SelectValue className="text-black" placeholder='Choose a category' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                            <CategoryWithLink category={category} />
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CategorySelect