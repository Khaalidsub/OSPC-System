import { useMutation } from "@apollo/client"
import { PrimaryButton,DisplayError, SecondaryButton } from "components"

import { withAuth } from "components/withAuth"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { UPDATE_USER } from "utililites/schema"
import { valdiateRegister, validateEditProfile } from "utililites/validate"
import { currentUser_currentUser } from "utililites/__generated__/currentUser"
import {updateUser,updateUserVariables} from 'utililites/__generated__/updateUser'
interface EditProfileProps{
    currentUser:currentUser_currentUser
}
export const EditProfile = (props:EditProfileProps)=>{
    const [message, setMessage] = useState('')
    const router = useRouter()
    const {email,name,university,phoneNumber} = props.currentUser
    const [updateUser] = useMutation<updateUser,updateUserVariables>(UPDATE_USER)
    const onSubmit = async ({email,name,phone})=>{
        try {
            await updateUser({variables:{updateUserInput:{email,name,phoneNumber:phone}}})
       router.replace('/settings')
        } catch (error) {
            setMessage(error.message)
        }
    }
    const formik = useFormik<any>({
        initialValues: {
            email , 
            name ,
     phone : phoneNumber ,
      
   
        },
        validate: validateEditProfile,
        onSubmit: onSubmit
    })
    return(
        <div className="grid grid-cols-1">

           
                <div className="w-8/12  place-self-center  flex flex-row justify-center bg-white shadow-lg rounded-lg">
                    
                    <form onSubmit={formik.handleSubmit} className="w-3/4 px-20 py-12 space-y-8 flex flex-col">
                        <h3 className="font-bold text-3xl text-primary">Edit Profile</h3>
                        {message && <DisplayError message={message} setError={setMessage}/>}
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Name</label>
                            {formik.touched.name && formik.errors.name ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.name}</h4>
                            ) : null}
                            <input {...formik.getFieldProps('name')} name='name' type='text' placeholder='name' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Email</label>
                            {formik.touched.email && formik.errors.email ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.email}</h4>
                            ) : null}
                            <input {...formik.getFieldProps('email')} name='email' type='email' placeholder='email' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
      
                        <div className="">
                            <label className="text-sm font-poppins pb-2">PhoneNumber</label>
                            {formik.touched.phone && formik.errors.phone ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.phone}</h4>
                            ) : null}
                            <input {...formik.getFieldProps('phone')} name='phone' type='number' placeholder='phone number' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
   
         
                 
                        <div className="self-center text-center w-3/4">

                            <SecondaryButton color={'bg-yellow-500'} label="Edit Profile" />
                        </div>
                    </form>

                </div>

  
        </div>
    )

}

export default withAuth(EditProfile)