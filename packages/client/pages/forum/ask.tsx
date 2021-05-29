// import { Editor, EditorState } from "draft-js"
import { useMutation, useLazyQuery } from "@apollo/client"
import { SecondaryButton, SecondarySelectField } from "components"
import { useFormik } from "formik"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import { CREATE_QUESTION, SUBJECTS } from "utilities/schema"
import { validateQuestion } from "utilities/validate"
import { subjects, subjects_subjects } from 'utilities/__generated__/subjects'
import { makeQuestion, makeQuestionVariables } from "utilities/__generated__/makeQuestion"
import { useRouter } from "next/router"
import { htmlToText } from 'html-to-text'
import { DisplayError } from "components/Cards/ErrorCard"
import { useMultipleFileUpload } from "hooks/useMultipleFileUpload"
import axios from "axios"
const TextEditor = dynamic(() => import("components/TextEditor"), {
    ssr: false,
})
export const AskQuestion = () => {
    const [fetchSubjects, { data: subjects }] = useLazyQuery<subjects>(SUBJECTS)
    const router = useRouter()
    const [askQuestion] = useMutation<makeQuestion, makeQuestionVariables>(CREATE_QUESTION)
    const [body, setBody] = useState('')
    const [subject, setSubject] = useState({} as subjects_subjects)
    const [message, setError] = useState('')
    const {UploadCard,files,setFiles} = useMultipleFileUpload({label:'Reference (Optional)', description:'Add additional documents to help others to understand your questions(max 3)'})



    const onSubmit = async ({ title }) => {
        try {
     
            // console.log('hello');
            if (htmlToText(body) && htmlToText(body).trim()) {
                const resultFiles = []
                if (files) {
                    const data = new FormData();
                    files.forEach((file,index) =>{
                        data.append(`files`,file)
                    })
                    const result = await axios.post(process.env.NEXT_PUBLIC_MANY_API, data, { headers: { "Access-Control-Allow-Origin": "*" } });
                    // console.log(result.data);
                    resultFiles.push(...result.data?.map(file=>{return {fileName:file.filename,originalName:file.originalname,type:file.type}}))
                    
                }
                await askQuestion({ variables: { createQuestionInput: { title: title, body: body, subject: subject.id , references:resultFiles } } })
                router.replace('/forum?isRefetch=true')
            } else
                setError('Body must not be empty')
        } catch (error) {
            // console.log(error);
            setError(error.message)
        }
    }


    //get the available subjects
    // submit the question
    //error handling on the inputs
    const formik = useFormik<any>({
        initialValues: {
            title: "",
        },
        validate: validateQuestion,
        onSubmit: onSubmit
    })
    return (
        <div className="grid grid-cols-1">
            <div className="flex flex-col space-y-8 w-3/6 place-self-center">
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-y-12 bg-white py-12 px-12 rounded-xl shadow-md space-y-4">
                    <h3 className='font-bold text-primary font-poppins text-2xl'>Ask The Community</h3>
                    {message && <DisplayError message={message} setError={setError} />}
                    <div className="space-y-3">

                        <label className="text-sm font-poppins font-semibold">Title</label>
                        {formik.touched.title && formik.errors.title ? (
                            <h4 className="text-red-500 text-xs" >{formik.errors.title}</h4>
                        ) : null}
                        <input {...formik.getFieldProps('title')} name='title' type='text' placeholder='title' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  border border-gray-200" />
                    </div>
                    <div className='space-y-3'>

                        <label className="text-sm font-poppins font-semibold">Body</label>
                        <TextEditor onInput={setBody} />
                    </div>
                    <UploadCard/>
                    <div className='flex flex-col space-y-2'>

                        <label className="text-sm font-poppins font-semibold">Subject</label>
                        <SecondarySelectField onChange={fetchSubjects} value={subject?.id || ''} label="subject" onClick={(e) => {

                            const selectedSubject = subjects.subjects.find(s => s.id === e.target.value);
                            setSubject(selectedSubject)
                        }} data={subjects?.subjects.map((subject) => { return { value: subject.id, label: subject.name } })} />
                    </div>
                    <div className='w-3/4 mx-auto'>

                        <SecondaryButton color='bg-secondary' label='Post My Question' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AskQuestion


