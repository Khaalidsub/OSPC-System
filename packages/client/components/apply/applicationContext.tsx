import { createContext, useEffect, useState } from 'react';
import {
  CreateSubjecSpecialization,
  CreateWeeklyScheduleInput,
} from '__generated__/globalTypes';
import * as SubjectsTypes from 'utilities/__generated__/subjects';
import { initialSchedule } from 'reducer/schedule';
import { ISelectFieldValue } from 'utilities/util';
import { useQuery } from '@apollo/client';
import { APPLY_COACH_SUBJECTS } from 'utilities/schema';
export enum FormSlide {
  subject,
  schedule,
  confirmation,
  complete,
}
const defaultContext = {
  subjectSpecialization: {} as CreateSubjecSpecialization,
  weeklySchedule: { schedule: initialSchedule } as CreateWeeklyScheduleInput,
  subject: {} as SubjectsTypes.subjects_subjects,
  subjects: [] as ISelectFieldValue[],
  slide: FormSlide.subject,
  setSubjects: ([]: SubjectsTypes.subjects_subjects[]) => { },
  setWeeklySchedule: (weeklySchedule: CreateWeeklyScheduleInput) => { },
  setSubjectSpecialization: (
    subjectSpecialization: CreateSubjecSpecialization,
  ) => { },
  setSubject: (subject: SubjectsTypes.subjects_subjects) => { },
  setSlide: (slide: FormSlide) => { }
};


export const ApplicationContext = createContext(defaultContext);

export const ApplicationContextProvider = (props: any) => {

  // const { data, loading, error } = useQuery<SubjectsTypes.subjects>(APPLY_COACH_SUBJECTS)
  const setSlide = (slide: FormSlide) => {
    setState({ ...state, slide: slide })
  }
  const setSubject = (subject: SubjectsTypes.subjects_subjects) => {

    // const selectSubject = data?.subjects.find(s => s.id === subject);
    setState({ ...state, subject: subject });
  }
  const setWeeklySchedule = (weeklySchedule: CreateWeeklyScheduleInput) => {

    setState({ ...state, weeklySchedule });
  }
  const setSubjectSpecialization = (
    subjectSpecialization: CreateSubjecSpecialization,
  ) => {
    console.log('yoo', { ...state });

    setState({ ...state, subjectSpecialization });

  }

  // const setSubjects = (datasubjects: SubjectsTypes.subjects_subjects[]) => {
  //   // console.log('changes', subjects);
  //   // const subjects = as ISelectFieldValue[]
  //   setState({
  //     ...state,
  //     subjects: [...datasubjects.map((subj) => {

  //       return {
  //         value: subj.id,
  //         label: subj.name
  //       }
  //     })]
  //   });
  // }
  const initState = {
    ...defaultContext, setSubject, setSubjectSpecialization, setWeeklySchedule, setSlide
  }
  const [state, setState] = useState(initState)
  useEffect(() => {
    console.log('states', state);

  })
  // useEffect(() => {
  //   if (data && data.subjects) {

  //     setSubjects([...data.subjects] || [])
  //   }

  //   // console.log('sup changed', data?.subjects);

  //   console.log('sup');

  // }, [data])

  // useEffect(() => {
  //   setSubject(data?.subjects[0].id)
  // }, [data])
  return (
    <ApplicationContext.Provider value={state}>{props.children}</ApplicationContext.Provider>
  )
}