import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";

import { useGetThreadCategories } from "@/hooks/useThreadCategories";

function ThreadCategoriesSelect({ onValueChange, defaultValue, ...props }: SelectProps): React.ReactElement {
    const { data: threadCategories, isFetched } = useGetThreadCategories()

    if (!threadCategories) return <span>Loading...</span>

    if (isFetched && !threadCategories.length) return <span>No categories are available</span>

    return (
        <Select onValueChange={onValueChange} defaultValue={defaultValue} {...props}>
            <SelectTrigger>
                <SelectValue className="text-black" placeholder='Choose a thread category' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {threadCategories.map(tC => (
                        <SelectItem key={tC.id} value={tC.id.toString()}>
                            {tC.threadCategoryName}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default ThreadCategoriesSelect