import { useMutation, useQuery } from "@apollo/client";
import { SecondarySelectField } from "components";
import { SecondaryButton } from "components/Buttons"
import DisplayError from "components/Cards/ErrorCard";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react"
import { SUBJECT, UPDATE_SUBJECT, } from "utilities/schema";
import { validateSubject } from "utilities/validate";
import { updateSubject, updateSubjectVariables } from 'utilities/__generated__/updateSubject'
import { subject, subjectVariables } from 'utilities/__generated__/subject'
function UpdateSubject() {
    const [message, setError] = useState('')
    const router = useRouter()
    const { id } = router.query
    console.log(id);

    const { data } = useQuery<subject, subjectVariables>(SUBJECT, { variables: { id: id as string } })
    const [updateSubject] = useMutation<updateSubject, updateSubjectVariables>(UPDATE_SUBJECT)
    const onSubmit = async ({ name, description, ...values }) => {

        try {
            console.log(name, description, values);
            await updateSubject({ variables: { updateSubject: { name, description }, id: id as string } })
            router.back()
        } catch (error) {

            setError(error.message)

        }
    }
    const formik = useFormik<any>({
        initialValues: {
            name: data?.subject.name,
            description: data?.subject.description
        },
        validate: validateSubject,
        onSubmit: onSubmit
    })

    return (
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/6 place-self-center self-center">
                <div className="grid grid-cols-1 bg-white py-12 rounded-xl shadow-md space-y-4">
                    <h4 className="text-4xl text-center">Update Subject</h4>
                    {message && <DisplayError message={message} setError={setError} />}
                    <form onSubmit={formik.handleSubmit} className="w-3/5 justify-self-center space-y-6">

                        <div className="">

                            <label className="text-sm font-poppins pb-2">Subject Name</label>
                            {formik.touched.name && formik.errors.name ? (
                                <h4 className="text-red-500 text-xs" >{formik.errors.name}</h4>
                            ) : null}
                            <input {...formik.getFieldProps('name')} name='name' type='text' placeholder='area' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="">

                            <label className="text-sm font-poppins pb-2">Description</label>
                            {formik.touched.description && formik.errors.description ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.description}</h4>
                            ) : null}
                            <textarea {...formik.getFieldProps('description')} name='description' placeholder='subject area description' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>

                        <div className="w-3/5 pt-12 mx-auto">

                            <SecondaryButton color="bg-yellow-500" label='Update Subject' />

                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default UpdateSubject