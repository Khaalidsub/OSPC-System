import { useFormik } from "formik"
import { validateCoachDescription } from "utililites/validate"

export const CoachApplication = ({ onCoachApplcationSubmit }) => {
    const onSubmit = ({ description }) => {
        onCoachApplcationSubmit({ description })
    }
    const formik = useFormik<any>({
        initialValues: {
            description: "",
        },
        validate: validateCoachDescription,
        onSubmit: onSubmit
    })
    return (
        <>
            <div className="flex flex-col items-center space-y-8">

                <h3 className="text-center text-xl font-semibold">Coach Application</h3>
                <form onSubmit={formik.handleSubmit}>

                    <div className="">
                        <label className="text-sm font-poppins pb-2">Title</label>
                        {formik.touched.description && formik.errors.description ? (
                            <h4 className="text-red-500 text-xs" >{formik.errors.title}</h4>
                        ) : null}
                        <input {...formik.getFieldProps('description')} name='description' type='text' placeholder='describe yourself' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                    </div>
                </form>
            </div>

        </>
    )
}