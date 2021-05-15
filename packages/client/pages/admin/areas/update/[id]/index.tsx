import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { SecondaryButton } from "components/Buttons"
import { useFormik } from "formik";
import { useImageUpload } from "hooks/useImageUpload";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { subjectAreaDefault } from "utililites/util";
import { DEPARTMENT_BY_ID, UPDATE_SUBJECT_AREA } from "utilities/schema";
import { validateSubjectArea } from "utilities/validate";
import * as departmentTypes from "utilities/__generated__/getDepartment"
import * as updateDepartmentTypes from "utilities/__generated__/updateSubjectArea"
function UpdateSubjectArea() {
    const router = useRouter()
    const { id } = router.query
    const [message, setError] = useState('')
    const { data } = useQuery<departmentTypes.getDepartment, departmentTypes.getDepartmentVariables>(DEPARTMENT_BY_ID, { variables: { id: id as string } })
    const [updateSubjectArea] = useMutation<updateDepartmentTypes.updateSubjectArea, updateDepartmentTypes.updateSubjectAreaVariables>(UPDATE_SUBJECT_AREA)
    const [name, setName] = useState('')
    const { ImageCard, file, setFile } = useImageUpload(data?.department.image || subjectAreaDefault)
    const [description, setDescription] = useState('')
    useEffect(() => {
        // console.log(data, id);
        setName(data?.department.name)
        setDescription(data?.department.description)
    }, [data])
    const onSubmit = async ({ name, description, ...values }) => {
        try {
            if (file) {
                const data = new FormData();
                data.append('file', file);

                const result = await axios.post(process.env.NEXT_PUBLIC_IMAGE_API, data, { headers: { "Access-Control-Allow-Origin": "*" } });
                await updateSubjectArea({ variables: { updateSubjectArea: { name, description ,image:result.data }, id: id as string } })

            } else await updateSubjectArea({ variables: { updateSubjectArea: { name, description }, id: id as string } })

            router.replace(`/admin/areas?isRefetch=true`)
        } catch (error) {

            setError(error.message)

        }
    }

    const formik = useFormik<any>({

        initialValues: {

            name: data?.department.name,
            description: data?.department.description
        },
        enableReinitialize: true,
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
                    <h4 className="text-4xl text-center">Update Subject Area</h4>
                    {message && <DisplayError />}
                    <form onSubmit={formik.handleSubmit} className="w-3/5 justify-self-center space-y-6">

                        <div className="">

                            <label className="text-sm font-poppins pb-2">Subject Area Name</label>
                            {formik.touched.name && formik.errors.name ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.name}</h4>
                            ) : null}
                            <input {...formik.getFieldProps('name')} name='name' type='text' placeholder='area' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <ImageCard />
                        <div className="">

                            <label className="text-sm font-poppins pb-2">Description</label>
                            {formik.touched.description && formik.errors.description ? (
                                <h4 className="text-red-500 text-xs " >{formik.errors.description}</h4>
                            ) : null}
                            <textarea {...formik.getFieldProps('description')} name='description' placeholder='subject area description' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>

                        <div className="w-3/5 pt-12 mx-auto">

                            <SecondaryButton color={'bg-yellow-500'} label='Update Subject Area' />

                        </div>
                    </form>



                </div>

            </div>
        </div>
    )
}

export default UpdateSubjectArea

