import { SetURLSearchParams } from "react-router-dom"
import TakeButton from "../input/TakeButton"

type TakeButtonsProps = {
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams
    query?: string
}



function TakeButtons({ searchParams, setSearchParams, query }: TakeButtonsProps) {
    const takeArr = ['5', '10', '15']

    return (
        <div className="flex space-x-2 justify-between items-center">
            <span className="text-lg" children='Take amount ->' />
            <div className="space-x-3">
                {takeArr.map((takeNum, i) => (
                    <TakeButton key={i}
                        className="size-10 rounded-md"
                        children={takeNum}
                        isChosen={searchParams.get('take') === takeNum}
                        onClick={() => setSearchParams([
                            query && ['query', query] || ['', ''],
                            ['page', searchParams.get("page") || '1'],
                            ['take', takeNum]
                        ])} />
                ))}
            </div>
        </div>
    )
}

export default TakeButtons