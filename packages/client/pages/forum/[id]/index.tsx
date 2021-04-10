import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { SecondaryButton } from "components/Buttons"
import { formatDistance } from "date-fns"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { ANSWERS, ANSWER_QUESTION, QUESTION, VOTE_ANSWER } from "utilities/schema"
import { question, questionVariables } from 'utilities/__generated__/question'
import { answers, answersVariables, answers_answers } from 'utilities/__generated__/answers'
import { answerQuestion, answerQuestionVariables } from 'utilities/__generated__/answerQuestion'
import { voteAnswer, voteAnswerVariables } from 'utilities/__generated__/voteAnswer'
import { htmlToText } from 'html-to-text'
import dynamic from "next/dynamic"
import DisplayError from "components/Cards/ErrorCard"
const ViewTextEditor = dynamic(() => import("components/TextEditor/ViewEditor"), {
    ssr: false,
})
const AnswerTextEditor = dynamic(() => import("components/TextEditor/AnswerEditor"), {
    ssr: false,
})
export const Question = (): JSX.Element => {
    const router = useRouter()
    const { id } = router.query
    const { data } = useQuery<question, questionVariables>(QUESTION, { variables: { id: id as string } })
    const [fetchAnswers, { called, data: answerData, refetch }] = useLazyQuery<answers, answersVariables>(ANSWERS, { variables: { id: id as string } })
    const [answerQuestion] = useMutation<answerQuestion, answerQuestionVariables>(ANSWER_QUESTION)
    const [voteAnswer] = useMutation<voteAnswer, voteAnswerVariables>(VOTE_ANSWER)
    const [isAnswerMode, setIsAnswerMode] = useState(false)
    const [answer, setAnswer] = useState('')
    const [message, setError] = useState('')
    const [showAnswer, setShowAnswer] = useState(called)
    //fetch answer two's only when the arrao is clicked
    // update the area or add when there is a new answer
    // vote answers


    const onSubmit = async () => {
        try {
            console.log('hello');
            if (htmlToText(answer) && htmlToText(answer).trim()) {
                // await askQuestion({ variables: { createQuestionInput: { title: title, body: body, subject: subject.id } } })
                // router.replace()
                //update the answer
                await answerQuestion({ variables: { answerQuestionInput: { input: answer, question: id as string } } })
                refetch()
                setIsAnswerMode(false)
                setError('')
            } else
                setError('Answer must not be empty')
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }
    const onVoteAnswer = async ({ vote, id }) => {
        try {
            await voteAnswer({ variables: { id, vote } })
            refetch()
            setError('')
        } catch (error) {
            setError(error.message)
        }
    }
    const QuestionTitle = ({ title, createdAt = Date(), subject }) => {
        return (
            <div className="flex flex-col">
                <h4 className="text-sm text-secondary">Question</h4>
                <h2 className="text-3xl text-primary capitalize">{title}</h2>
                <div className="flex flex-row justify-between items-center font-raleway">
                    <span className="text-xs">{formatDistance(Date.parse(createdAt), Date.now(), { addSuffix: true })}</span>
                    <span className="text-information">{subject}</span>

                </div>
            </div>
        )
    }
    const QuestionBody = ({ body }): JSX.Element => {
        return (
            <div className='font-raleway'>
                <ViewTextEditor content={body} />
            </div>
        )
    }
    const Answer = ({ createdAt, id, input, isApproved, user, votes }: answers_answers) => {
        const color = isApproved ? 'text-green-300' : 'text-secondary'
        return (<div className='flex flex-row space-x-3 '>
            <div className='flex flex-col items-center'>
                <img onClick={() => { onVoteAnswer({ vote: true, id }) }} className='cursor-pointer h-12 w-12' src="/assets/up-arrow.svg" alt="" />
                <h3 className={`text-xl font-semibold  ${color}`}>{votes}</h3>

                <img onClick={() => { onVoteAnswer({ vote: false, id }) }} className='cursor-pointer h-12 w-12' src="/assets/down-arrow.svg" alt="" />
            </div>
            <div className='flex flex-col space-y-2 w-full prose'>
                <h3 className='font-semibold'>{user.name}</h3>
                <p className='line-clamp-3'>{htmlToText(input)}</p>
                <span className='italic'>{formatDistance(Date.parse(createdAt), Date.now(), { addSuffix: true })}</span>
            </div>


        </div>)
    }
    const Answers = () => {
        return (<div className="mx-auto w-1/2 space-y-16">
            <span className='text-sm font-semibold font-raleway text-secondary'>{answerData?.answers.length} Answer</span>
            {answerData?.answers.map((answer) => {
                return <Answer key={answer.id} {...answer} />
            })}
        </div>)
    }
    return (<div className="grid grid-cols-1">

        <div className="flex flex-col space-y-8 w-3/6 place-self-center">

            <div className="grid grid-cols-1 gap-y-8 bg-white py-12 px-12 rounded-xl shadow-md space-y-4">
                <QuestionTitle title={data?.question.title} subject={data?.question.subject.name} createdAt={data?.question.createdAt} />
                <QuestionBody body={data?.question.body} />
                <h3 className='font-semibold'>{data?.question.user.name}</h3>
                <hr />
                {!showAnswer && (
                    <div onClick={() => { fetchAnswers(); setShowAnswer(true) }} className='flex flex-row items-center space-x-3 mx-auto hover:underline cursor-pointer'>

                        <h3 className='font-normal text-2xl text-secondary '>Answers</h3>

                        <img className='cursor-pointer h-6 w-6' src="/assets/down-arrow.svg" alt="" />
                    </div>)}
                {showAnswer && <Answers />}
                {showAnswer && (
                    <div onClick={() => { setShowAnswer(false) }} className='flex flex-row items-center space-x-3 mx-auto hover:underline cursor-pointer'>

                        <h3 className='font-normal text-2xl text-secondary '>Less</h3>

                        <img className='cursor-pointer h-6 w-6' src="/assets/up-arrow.svg" alt="" />
                    </div>)}
                <div>

                    {message && <DisplayError message={message} setError={setError} />}
                    {isAnswerMode && <AnswerTextEditor onInput={setAnswer} />}
                </div>
                <SecondaryButton onClick={() => {
                    if (!isAnswerMode) {
                        setIsAnswerMode(true)
                    } else {
                        onSubmit()
                    }
                }} color="bg-secondary" label="Submit an Answer" />
            </div>
        </div>

    </div>)


}


export default Question