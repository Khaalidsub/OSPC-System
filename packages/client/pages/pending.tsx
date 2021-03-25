import { getUserFromCookie } from "lib/utils";

export const PendingStatus = () => {
    const user = getUserFromCookie()
    if (!user) {
        return <></>
    }
    return (

        <div className="h-full w-full bg-primary">
            <div className="h-full grid grid-cols-1">
                <div className="h-3/4 w-1/2  p-4 self-center place-self-center bg-white flex flex-col justify-center space-y-24 items-center shadow-lg rounded-lg">
                    <h3 className='text-3xl font-semibold font-poppins'>Hello {user.name}</h3>
                    <h4>Your account status is still pending</h4>
                    <h4>It may take a few minutes to be verify your account</h4>
                    <h5>Thank you for your patience!</h5>
                </div>

            </div>

        </div>
    )


};


export default PendingStatus