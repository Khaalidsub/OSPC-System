import { gql } from '@apollo/client';
//fragments
export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    name
    email
    role
    accountStatus
    coachingStatus
  }
`;

export const IS_AUTHORIZED = gql`
  mutation isAuthorized {
    isAuthorized
  }
`;
//Mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(credentials: { email: $email, password: $password }) {
      token
      user {
        ...UserParts
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const REGISTER_USER = gql`
  mutation registerUser($createUserInput: CreateUserInput!) {
    registerStudent(createUserInput: $createUserInput) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const APPLY_AS_COACH = gql`
  mutation applyAsCoach(
    $createWeeklySchedule: CreateWeeklyScheduleInput!
    $createSubjectSpecialization: CreateSubjecSpecialization!
  ) {
    applyCoach(
      createWeeklySchedule: $createWeeklySchedule
      createSubjectSpecialization: $createSubjectSpecialization
    ) {
      ...UserParts
    }
  }

  ${USER_FRAGMENT}
`;

export const REJECT_COACH = gql`
  mutation rejectCoach($id: String!) {
    rejectCoach(id: $id) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const ACCEPT_COACH = gql`
  mutation approveCoach($id: String!) {
    approveCoach(id: $id) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;
export const REJECT_STUDENT = gql`
  mutation rejectStudent($id: String!) {
    rejectStudent(id: $id) {
      university
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const ACCEPT_STUDENT = gql`
  mutation approveStudent($id: String!) {
    approveStudent(id: $id) {
      university
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const ADD_MODERATOR = gql`
  mutation addModerator($createUserInput: CreateUserInput!) {
    addModerator(createDepartmentModerator: $createUserInput) {
      ...UserParts
    }
  }

  ${USER_FRAGMENT}
`;

export const ADD_SUBJECT_AREA = gql`
  mutation addSubjectArea($createSubjectArea: CreateDepartmentInput!) {
    createDepartment(createDepartmentInput: $createSubjectArea) {
      id
      name
      description
      subjects
      moderator {
        name
      }
    }
  }
`;
export const UPDATE_SUBJECT_AREA = gql`
  mutation updateSubjectArea(
    $id: String!
    $updateSubjectArea: UpdateDepartmentInput!
  ) {
    updateDepartment(id: $id, updateDepartmentInput: $updateSubjectArea) {
      id
      name
      description
      subjects
      moderator {
        name
      }
    }
  }
`;
export const ADD_SUBJECT = gql`
  mutation addSubject($createSubject: CreateSubjectInput!) {
    createSubject(createSubjectInput: $createSubject) {
      id
      name
      description
      department {
        id
        name
      }
    }
  }
`;
export const UPDATE_SUBJECT = gql`
  mutation updateSubject($updateSubject: UpdateSubjectInput!, $id: String!) {
    updateSubject(updateSubjectInput: $updateSubject, id: $id) {
      id
      name
      description
      department {
        id
        name
      }
    }
  }
`;

export const BOOK_LESSON = gql`
  mutation bookLesson($createLesson: CreateLessonInput!) {
    bookLesson(createLessonInput: $createLesson) {
      id
      day
      date
      time_start
      duration
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation updateSchedule(
    $updateSchedule: UpdateWeeklySchedule!
    $id: String!
  ) {
    updateWeeklySchedule(id: $id, updateWeeklySchedule: $updateSchedule) {
      id
    }
  }
`;
// Query
export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const USERS = gql`
  query users {
    users {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const STUDENTS = gql`
  query students {
    students {
      university
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const COACHES = gql`
  query coaches {
    pendingCoaches {
      university
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;
export const COACH = gql`
  query coach($id: String!, $dateTo: Float!, $dateFrom: Float!) {
    user(id: $id) {
      university
      ...UserParts
    }
    getUserSpecialization(id: $id) {
      id
      specialization {
        title
        description
      }
      subject {
        id
        name
      }
    }
    getCoachSchedule(id: $id) {
      id
      schedule {
        day
        time_start
        time_end
      }
    }
    getBookedLessonsOfTheWeek(
      coach: $id
      dateTo: $dateTo
      dateFrom: $dateFrom
    ) {
      id
      day
      date
      time_start
      duration
    }
  }
  ${USER_FRAGMENT}
`;

export const ACTIVE_COACHES = gql`
  query activeCoaches($id: String) {
    activeCoaches(subject: $id) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const COACH_SCHEDULE = gql`
  query coachSchedule($id: String!) {
    getUserSpecialization(id: $id) {
      id
      specialization {
        title
      }
      subject {
        id
        name
      }
    }
    getCoachSchedule(id: $id) {
      id
      schedule {
        day
        time_start
        time_end
      }
    }
  }
`;
export const APPLY_COACH_SUBJECTS = gql`
  query subjects {
    subjects {
      name
      id
    }
  }
`;

export const SUBJECT_AREAS = gql`
  query subjectAreas {
    departments {
      id
      name
      description
      subjects
      moderator {
        name
      }
    }
  }
`;
export const SELECT_SUBJECT_AREAS = gql`
  query selectSubjectAreas {
    departments {
      id
      name
    }
  }
`;

export const SUBJECTS = gql`
  query getSubjects {
    subjects {
      id
      name
      description
      coaches
    }
  }
`;
export const SUBJECT = gql`
  query subject($id: String!) {
    subject(id: $id) {
      id
      name
      description
      coaches
    }
  }
`;
export const SUBJECTS_BY_DEPARTMENT = gql`
  query subjectsByDepartment($id: String!) {
    subjectsByDepartment(id: $id) {
      id
      name
      description
      coaches
      department {
        id
        name
      }
    }
  }
`;
export const SELECT_SUBJECTS_BY_DEPARTMENT = gql`
  query selectSubjectsByDepartment($id: String) {
    subjectsByDepartment(id: $id) {
      id
      name
    }
  }
`;
export const DEPARTMENT = gql`
  query department {
    departmentByModerator {
      id
      name
    }
  }
`;
export const DEPARTMENT_BY_ID = gql`
  query getDepartment($id: String!) {
    department(id: $id) {
      id
      name
      description
    }
  }
`;
export const SUBJECTS_BY_MODERATOR = gql`
  query subjectsByModerator {
    subjectsByModerator {
      id
      name
      description
      coaches
      department {
        id
        name
      }
    }
  }
`;

export const MODERATORS_OPTIONS = gql`
  query availableModerators {
    availableModerators {
      id
      name
    }
  }
`;

export const MODERATORS = gql`
  query moderators {
    moderators {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const COACH_LESSONS = gql`
  query coachLessons {
    coachLessons {
      id
      name
      email
      lessons_taken
      subjectSpecialization {
        specialization {
          title
          description
        }
      }
    }
  }
`;
export const SCHEDULE = gql`
  query schedule {
    getSchedule {
      id
      timeZone
      schedule {
        day
        time_start
        time_end
      }
    }
  }
`;
// Subscription
