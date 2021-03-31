import { useMutation, useQuery } from "@apollo/client";
import { SecondarySelectField } from "components";
import { SecondaryButton } from "components/Buttons"
import DisplayError from "components/Cards/ErrorCard";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react"
import { ADD_SUBJECT, DEPARTMENT } from "utilities/schema";
import { validateSubject } from "utilities/validate";
import * as AddSubject from 'utilities/__generated__/addSubject'
import * as Department from "utilities/__generated__/department"
function CreateSubject() {
    const [message, setError] = useState('')
    const router = useRouter()
    const [addSubject, { error }] = useMutation<AddSubject.addSubject, AddSubject.addSubjectVariables>(ADD_SUBJECT)
    const { data } = useQuery<Department.department>(DEPARTMENT)
    const onSubmit = async ({ name, description, ...values }) => {

        try {
            const department = data?.departmentByModerator
            console.log(name, description, values);
            // await addDepartment({ variables: { createSubjectArea: { name, description, moderator: moderator.id } } })
            // await addModerator({ variables: { createUserInput: { email: email, password: password, university: university, name } } })
            await addSubject({ variables: { createSubject: { name, description, department: department.id } } })
            router.replace('/moderator/subjects')
        } catch (error) {

            setError(error.message)

        }
    }
    const formik = useFormik<any>({
        initialValues: {
            name: "",
            description: ""
        },
        validate: validateSubject,
        onSubmit: onSubmit
    })

    return (
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/6 place-self-center">
                <div className="grid grid-cols-1 bg-white py-12 rounded-xl shadow-md space-y-4">
                    <h4 className="text-4xl text-center">Create Subject </h4>
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

                            <SecondaryButton label='Add Subject' />

                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CreateSubject
