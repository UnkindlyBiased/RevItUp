import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"

import { useGetCategories } from "@/hooks/useCategories"
import CategoryWithLink from "./CategoryLink"

type CategorySelectProps = {
    onValueChange: (value: string) => void
}

function CategorySelect({ onValueChange }: CategorySelectProps): React.ReactNode {
    const { data: categories } = useGetCategories()

    if (!categories) return <span>Loading</span>

    return (
        <Select onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue className="text-black" placeholder='Choose a category' />
            </SelectTrigger>
            <SelectContent className="">
                <SelectGroup>
                    {categories.map((category, i) => (
                        <SelectItem className="text-black" key={i} value={category.id.toString()}>
                            <CategoryWithLink category={category} />
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CategorySelect