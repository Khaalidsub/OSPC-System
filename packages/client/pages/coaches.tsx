import { CoachCard, InformationButton, SearchField, SelectField } from "components"
import React from "react"

export const Coaches = () => {
    return (
        <div className="mx-8 lg:mx-16 my-4">

            <div className="flex flex-col space-y-12 items-center">
                <SearchField />
                <div className="space-x-12">
                    <SelectField label="flueman" options={['choc', 'flue']} />
                    <SelectField label="flueman" options={['choc', 'flue']} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 gap-x-54">
                    <CoachCard />
                    <CoachCard />
                    <CoachCard />
                    <CoachCard />
                    <CoachCard />
                    <CoachCard />
                </div>
            </div>
        </div>
    )
}
export default Coaches