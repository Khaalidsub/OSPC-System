import React from 'react'
import { Navigation } from 'components'
import { GetStaticProps } from 'next'
import { useAuth } from 'lib/auth'
import { Role } from '__generated__/globalTypes'
export default function MainLayout(props: MainLayoutProps) {
    const { isSignedIn, isAuthorized } = useAuth()
    if (typeof window !== 'undefined') {
        console.log(isSignedIn(), isAuthorized(Role.student));

    }
    const RenderNavRole = () => {

    }
    return (

        <div className="min-h-screen  bg-gray-50 ">

            <div className="min-h-screen relative md:static flex flex-col-reverse md:justify-items-stretch md:flex-row">
                {isSignedIn() && <Navigation />}
                <div className="container space-y-10">
                    <div className="h-16 w-full flex flex-row justify-end space-x-8 p-4">
                        <img className="h-7 w-7" src="/assets/settings.svg" alt="" />
                        <img className="h-7 w-7" src="/assets/notification.svg" alt="" />
                        {/* <img src="/fake_images/" alt=""/> */}
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//     const { isSignedIn } = useAuth()
//     // const result = isSignedIn()
//     // console.log('the result is', result);

//     return {
//         props: {
//             ...context,
//             // isSignedIn
//         }
//     }
// }
export interface MainLayoutProps {
    children: any
    // isSignedIn: Function
}