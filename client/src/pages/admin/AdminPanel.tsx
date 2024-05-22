import RequireAdmin from "@/hoc/RequireAdmin"
import RequireAuth from "@/hoc/RequireAuth"
import React from "react"

function AdminPanel(): React.ReactElement {
    return (
        <RequireAuth>
            <RequireAdmin>
                <span>Admin panel</span>
            </RequireAdmin>
        </RequireAuth>
    )
}

export default AdminPanel