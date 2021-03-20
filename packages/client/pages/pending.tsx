import { getUserFromCookie } from "lib/utils";

export const PendingStatus = () => {
    const user = getUserFromCookie()
    if (!user) {
        return <></>
    }
    return (

        <div className="h-full bg-primary">
            <div className="h-full mx-8 md:mx-36 justify-around items-center">
                <div className="h-3/4 bg-white flex flex-col shadow-lg rounded-lg">
                    <h3 className='text-3xl'>Hello {user.name}</h3>
                    <h4>Your account status is still pending</h4>
                    <h4>It may take a few minutes to be verify your account</h4>
                    <h5>Thank you for your patience!</h5>
                </div>

            </div>

        </div>
    )


};


export default PendingStatus