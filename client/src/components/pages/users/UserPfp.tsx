import { ComponentPropsWithoutRef, Suspense } from "react";

function UserPfp({ className, src }: ComponentPropsWithoutRef<'img'>) {
    return (
        <Suspense>
            <img className={className} src={src} />
        </Suspense>
    )
}

export default UserPfp