import { useMutation, useQuery } from "@apollo/client";
import { FormSelectField, SecondarySelectField } from "components";
import { SecondaryButton } from "components/Buttons"
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { ADD_SUBJECT_AREA, MODERATORS_OPTIONS } from "utilities/schema";
import { validateSubjectArea } from "utilities/validate";

import * as AvailableModeratorTypes from 'utilities/__generated__/availableModerators'
import * as AddDepartment from 'utilities/__generated__/addSubjectArea'
function CreateSubjectArea() {
    const [moderators, setModerators] = useState([] as AvailableModeratorTypes.availableModerators_availableModerators[])
    const [moderator, setModerator] = useState({} as AvailableModeratorTypes.availableModerators_availableModerators)
    const { data } = useQuery<AvailableModeratorTypes.availableModerators>(MODERATORS_OPTIONS)
    const router = useRouter()
    const [addDepartment, { error }] = useMutation<AddDepartment.addSubjectArea, AddDepartment.addSubjectAreaVariables>(ADD_SUBJECT_AREA)

    const [message, setError] = useState('')
    useEffect(() => {
        setModerators(data?.availableModerators)
        setModerator(data?.availableModerators[0])
    }, [data])
    const onSubmit = async ({ name, description, ...values }) => {
        if (!moderator) {
            setError('Moderator not defined')
        }
        try {
            console.log(name, description, values);
            await addDepartment({ variables: { createSubjectArea: { name, description, moderator: moderator.id } } })
            // await addModerator({ variables: { createUserInput: { email: email, password: password, university: university, name } } })
            router.replace(`/admin/areas?isRefetch=true`)
        } catch (error) {

            setError(error.message)

        }
    }
    const formik = useFormik<any>({
        initialValues: {
            name: "",
            description: ""
        },
        validate: validateSubjectArea,
        onSubmit: onSubmit
    })
    const DisplayError = () => {
        return (
            <div className="bg-red-100 space-x-2 items-center border border-red-500 text-red-dark pl-4 pr-8 py-3 rounded flex flex-row" role="alert">
                <span className="">
                    <svg className="h-6 w-6 text-red-800 " onClick={() => {
                        setError('')
                    }} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                </span>
                {/* <strong className="font-bold">Error</strong> */}
                <span className="">{message}</span>
            </div>
        )
    }



    return (
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/6 place-self-center">
                <div className="grid grid-cols-1 bg-white py-12 rounded-xl shadow-md space-y-4">
                    <h4 className="text-4xl text-center">Create Subject Area</h4>
                    {message && <DisplayError />}
                    <form onSubmit={formik.handleSubmit} className="w-3/5 justify-self-center space-y-6">

                        <div className="">

                            <label className="text-sm font-poppins pb-2">Subject Area Name</label>
                            {formik.touched.name && formik.errors.name ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.name}</h4>
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
                        <div className="flex flex-col">
                            <label className="text-sm font-poppins pb-2">Moderator</label>
                            <FormSelectField label='Subject' data={moderators?.map(moderator => { return { label: moderator.name, value: moderator.id } })} onClick={(e) => {
                                e.preventDefault();
                                // console.log(e.target.value);
                                const selectedModerator = moderators.find(s => s.id === e.target.value);
                                setModerator(selectedModerator)

                            }} />
                        </div>
                        <div className="w-3/5 pt-12 mx-auto">

                            <SecondaryButton label='Add Subject Area' />

                        </div>
                    </form>



                </div>

            </div>
        </div>
    )
}

export default CreateSubjectArea
