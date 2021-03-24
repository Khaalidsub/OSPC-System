import { PrimaryButton, SecondarySelectField, SelectField } from 'components'
import { useModal } from 'hooks/useModal'
import { isBrowser } from 'lib/isBrowser'
import React, { useEffect } from 'react'
export const ApplyAsCoach = () => {
    const { openModal, closeModal, isOpen, Modal } = useModal()
    useEffect(() => {
        console.log(isOpen);


    }, [isOpen])
    const SecondaryButton = ({ label, }: any) => {
        return (
            <button type="submit" onClick={() => { }} className={` w-40 rounded-lg py-2 px-4 font-raleway text-white bg-secondary shadow-lg font-semibold text-xl`}>
                {label}
            </button>
        )
    }
    const AddSubjectSepc = () => {
        return (

            <Modal>

                <div className='h-full grid grid-cols-1' style={{ backgroundColor: 'rgba(31, 41, 50, 0.6)' }}>
                    <form className='h-1/2 w-2/5  px-20 md:space-y-8 p-6 py-2 bg-white self-center place-self-center rounded-lg flex flex-col relative'>

                        <button onClick={closeModal} className='text-right absolute left-12 top-6 text-raleway bg-red-400 p-2 text-white rounded-full'>X</button>
                        <h4 className='text-3xl font-poppins text-center'>Add Subject Specialization</h4>
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Title</label>
                            <input name='title' type='text' placeholder='title (javascript)' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="">
                            <label className="text-sm font-poppins pb-2">Description</label>
                            <input name='description' type='text' placeholder='description' className="w-full rounded-md  focus:outline-none focus:ring-opacity-75 focus:border-secondary  " />
                        </div>
                        <div className="self-center text-center w-full">

                            <PrimaryButton label="Add" />
                        </div>
                    </form>


                </div>

            </Modal>

        )
    }
    return (

        <div className="mx-20 my-2  ">
            <div className="bg-white shadow-lg rounded-lg px-6 py-12 space-y-12 justify-center ">
                <h2 className=" text-3xl font-poppins text-center">Apply as a Coach</h2>
                <div className="flex row justify-center space-x-24">
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-gray-100 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Choose Subject</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-gray-50 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Schedule</h4>
                    </div>
                    <div className="flex flex-col items-center space-y-12">
                        <div className="h-20 w-20 bg-gray-50 rounded-full flex justify-center items-center">
                            <div className="h-3 w-3 bg-primary rounded-full" ></div>
                        </div>
                        <h4>Confirmation Details </h4>
                    </div>

                </div>
                <div className='flex flex-col items-center space-y-12'>

                    <h3 className="text-center text-xl font-semibold">Choose Subject</h3>

                    <SecondarySelectField label='Subject' options={['flue']} onClick={() => { }} />
                    <h3 className='text-xl italic'>Subject Specialization</h3>
                    <div className='pointer-events-auto w-60 flex flex-row  items-center space-x-8 font-raleway'>
                        <img onClick={openModal} src='/assets/plus.svg' className='h-4 w-4 cursor-pointer' />
                        <h4 className='cursor-pointer' onClick={openModal}>Subject Specialization</h4>

                    </div>    {isOpen &&
                        <AddSubjectSepc />
                    }



                    <SecondaryButton label='next' />
                </div>
            </div>

        </div>
    )
}

export default ApplyAsCoach