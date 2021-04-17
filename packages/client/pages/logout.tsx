import { isBrowser } from "lib/isBrowser"
import { deleteTokenFromCookie, deleteUserFromCookie } from "lib/utils"
import { useRouter } from 'next/router'
export const Logout = () => {
    deleteTokenFromCookie()
    deleteUserFromCookie()
    const router = useRouter()
    isBrowser && router.push('/login')

    return (
        <div>
        </div>
    )
}

export default Logout