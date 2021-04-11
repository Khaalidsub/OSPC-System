import { PrimaryButton } from "components"
import { useFormik } from "formik"
import React from "react"
import { validateSubjectSepc } from "utilities/validate"

export const SubjectSpecModal = ({ onSubmit, closeModal }) => {
    const formik = useFormik<any>({
        initialValues: {
            title: "",
            description: "",
        },
        validate: validateSubjectSepc,
        onSubmit: onSubmit
    })
    return (

        <div className='h-full grid grid-cols-1' style={{ backgroundColor: 'rgba(31, 41, 50, 0.6)' }}>
            <form onSubmit={formik.handleSubmit} className='h-1/2 w-2/5  px-20 md:space-y-8 p-6 py-2 bg-white self-center place-self-center rounded-lg flex flex-col relative'>
                < button onClick={closeModal} className='text-right absolute right-12 top-6 text-raleway text-red-400 p-2  rounded-full'>X</button>
                <h4 className='text-3xl font-poppins text-center'>Add Subject Specialization</h4>
                <div className="">
                    <label className="text-sm font-poppins pb-2">Title</label>
                    {formik.touched.title && formik.errors.title ? (
                        <h4 className="text-red-500 text-xs" >{formik.errors.title}</h4>
                    ) : null}
                    <input {...formik.getFieldProps('title')} name='title' type='text' placeholder='title (javascript)' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                </div>
                <div className="">
                    <label className="text-sm font-poppins pb-2">Description</label>
                    {formik.touched.description && formik.errors.description ? (
                        <h4 className="text-red-500 text-xs" >{formik.errors.description}</h4>
                    ) : null}
                    <input  {...formik.getFieldProps('description')} name='description' type='text' placeholder='description' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                </div>
                <div className="self-center text-center w-full">

                    <PrimaryButton label="Add" />
                </div>
            </form>


        </div>
    )

}