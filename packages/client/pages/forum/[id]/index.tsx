import { SecondaryButton } from "components/Buttons"
import { useRouter } from "next/router"
import React from "react"

export const Question = (): JSX.Element => {
    const router = useRouter()
    const { id } = router.query
    const QuestionTitle = () => {
        return (
            <div className="flex flex-col">
                <h4 className="text-sm text-secondary">Question</h4>
                <h2 className="text-3xl text-primary">What is Programming</h2>
                <div className="flex flex-row justify-between items-center font-raleway">
                    <span className="text-xs">10 days ago</span>
                    <span className="text-information">programming</span>

                </div>
            </div>
        )
    }
    const QuestionBody = (): JSX.Element => {
        return (
            <div>
                <p>Fugiat pariatur voluptate adipisicing officia consequat nostrud reprehenderit velit non. Commodo consectetur esse exercitation fugiat officia aute sint. Occaecat minim deserunt non eiusmod. Laborum ad do cillum mollit. Elit nostrud ut anim cupidatat deserunt velit nisi est et excepteur.

                Consectetur enim culpa qui consequat magna est commodo. Eu proident consectetur sint commodo reprehenderit cupidatat laborum labore amet sunt nulla consectetur cupidatat. Laboris eu ad aute sunt fugiat non proident. Fugiat sint Lorem mollit labore ullamco consectetur occaecat sint laborum laborum aliquip sunt cupidatat mollit. Lorem anim voluptate nulla culpa pariatur in anim incididunt consectetur consequat consequat laboris do laboris. Excepteur incididunt fugiat proident magna tempor labore. Ad culpa quis ex nisi et amet mollit.

                Ad ad id do anim magna est nostrud culpa enim esse in sint ipsum ullamco. Qui pariatur laboris proident magna cillum incididunt cupidatat eiusmod. Lorem occaecat nostrud et quis qui aliqua magna cupidatat do laboris pariatur.

Do quis minim excepteur aliquip ullamco sunt duis laborum. Consequat sit sint ut cupidatat. Officia est ullamco adipisicing aliqua non ad deserunt nisi.</p>
            </div>
        )
    }
    const Answer = () => {
        return (<div className='flex flex-row'>
            <div className=''>

            </div>
            <div className='flex flex-col space-y-2 prose prose-sm'>
                <h3 className='font-semibold'>Abdi Caano</h3>
                <p className='line-clamp-3'>Aute sunt consequat minim deserunt. Culpa cillum officia velit consectetur quis quis pariatur officia sint occaecat. Ex duis enim pariatur excepteur eiusmod irure dolor incididunt culpa eu velit consectetur. Laboris aliqua et amet exercitation exercitation pariatur fugiat incididunt nostrud ut officia nulla voluptate adipisicing. Proident laboris deserunt exercitation duis.

                In ea ex excepteur aute occaecat quis do irure ex voluptate veniam. Commodo ullamco tempor sunt dolore officia cupidatat. Id minim aliqua voluptate fugiat occaecat sit duis do esse. Officia irure laborum nulla ipsum eiusmod aute culpa laborum consectetur sunt cupidatat dolor nostrud. Non esse commodo exercitation officia magna ex voluptate consequat ut eu.

Id duis culpa in consequat labore ullamco nulla duis sunt in in dolore ea aliquip. Exercitation mollit nulla amet minim est sunt eiusmod eiusmod eu est elit esse ad. Laborum incididunt anim adipisicing fugiat dolore duis minim minim occaecat irure. Officia occaecat eiusmod voluptate ipsum pariatur minim id enim do voluptate.</p>

            </div>


        </div>)
    }
    const Answers = () => {
        return (<>
            <Answer />
            <Answer />
            <Answer />
        </>)
    }
    return (<div className="grid grid-cols-1">

        <div className="flex flex-col space-y-8 w-3/6 place-self-center">

            <div className="grid grid-cols-1 gap-y-12 bg-white py-12 px-12 rounded-xl shadow-md space-y-4">
                <QuestionTitle />
                <QuestionBody />
                <h3 className='font-semibold'>Sasha liskov</h3>
                <hr />
                <span className='text-sm font-semibold font-raleway text-secondary'>1 Answer</span>
                <Answers />
                <SecondaryButton color="bg-secondary" label="Submit an Answer" />
            </div>
        </div>

    </div>)


}


export default Question