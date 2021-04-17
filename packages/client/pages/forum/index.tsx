import { useQuery } from '@apollo/client'
import { withAuth } from 'components/withAuth'
import { useRouter } from 'next/router'
import { QUESTIONS } from 'utilities/schema'
import { questions, questions_questions } from 'utilities/__generated__/questions'
import { formatDistance } from 'date-fns'
import { htmlToText } from 'html-to-text'
import React, { useEffect, useState } from 'react'
import { SearchField } from 'components'
export const Forum = () => {
    const { data, refetch } = useQuery<questions>(QUESTIONS)
    const [search, setSearch] = useState('')
    const [questions, setQuestions] = useState([] as questions_questions[])
    const router = useRouter()
    const { isRefetch } = router.query
    useEffect(() => {
        setQuestions(data?.questions)
    }, [data])
    useEffect(() => {
        if (isRefetch) {
            refetch()
        }
    }, [isRefetch])
    useEffect(() => {
        const result = data?.questions.filter(question => {
            return question?.title?.toLowerCase().includes(search)
        })
        setQuestions(result)
    }, [search])
    const Metadata = ({ name, createdAt, subject, answers }) => {
        return (
            <div className="flex flex-row space-x-4 text-xs">
                <p className="text-secondary ">{answers} Answer(s)</p>
                <p>{formatDistance(Date.parse(createdAt), Date.now(), { addSuffix: true })}</p>
                <p>by {name}</p>
                <p className="text-information">{subject}</p>
            </div>
        )
    }
    const Question = ({ id, title, subject, createdAt, user, body, answers }: questions_questions) => {
        return (
            <div className="w-full self-center flex flex-col bg-white rounded-md shadow-md  p-4 space-y-4">
                <h2 onClick={() => router.push(`/forum/${id}`)} className="font-raleway text-2xl capitalize cursor-pointer hover:underline" >{title}</h2>
                <p className="font-raleway line-clamp-2 pr-28 font-normal">{htmlToText(body)}</p>
                <Metadata name={user.name} createdAt={createdAt} subject={subject.name} answers={answers} />
            </div>
        )
    }
    const QuestionList = () => {
        return (
            <>
                {questions?.map(question => {
                    return <Question key={question.id} {...question} />
                })}
            </>
        )
    }

    const SelectField = () => {
        return (

            <select className="border-none outline-none focus:outline-none bg-transparent">
                <option value="Most Recent">Most Recent</option>
            </select>
        )
    }
    return (
        <div className="grid grid-cols-1">
            <div className="w-3/4 mx-auto flex flex-col space-y-2 ">
                <h3 className='capitalize text-3xl text-center font-poppins text-primary font-thin mb-6'>What do you want to know today?</h3>
                <SearchField placeholder='Search Question' setSearch={setSearch} search={search} />
                <div className=" flex flex-row justify-between px-4 pt-6">
                    <div className="space-x-4 flex flex-row items-center self-end">
                        <h3>{questions?.length || 0} Question(s)</h3>
                        <button onClick={() => router.push('forum/ask')} className="px-5 py-2 font-semibold rounded-md shadow-md font-raleway bg-tertiary text-white">Ask Question</button>
                    </div>
                    <div className="space-x-4">
                        <SelectField />
                        {/* <SelectField /> */}
                    </div>


                </div>
                <QuestionList />
            </div>

        </div>

    )
}

export default withAuth(Forum)