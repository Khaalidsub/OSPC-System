import { gql } from '@apollo/client';
//fragments
export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    name
    email
    university
    phoneNumber
    role
    image
    accountStatus
    coachingStatus
  }
`;
export const ANSWER_FRAGMENT = gql`
  fragment AnswerParts on Answer {
    id
    input
    votes
    user {
      id
      name
    }
    isApproved
    createdAt
  }
`;
export const MESSAGE_FRAGMENT = gql`
  fragment MessageParts on Message {
    id
    sender {
      id
      image
    }
    chat {
      id
    }
    input
    createdAt
    updatedAt
  }
`;
export const CHAT_FRAGMENT = gql`
  fragment ChatParts on Chat {
    id
    isOpen
    users {
      id
      name
      image
    }
    createdAt
    updatedAt
  }
`;

export const BASE_CONNECTION_FRAGMENT = gql`
  fragment BasePaginateParts on QuestionConnection {
    totalDocs
    limit
    totalPages
    hasNextPage
    hasPrevPage
    page
    nextPage
    prevPage
    pagingCounter
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageParts
    }
  }
  ${MESSAGE_FRAGMENT}
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
export const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const APPLY_AS_COACH = gql`
  mutation applyAsCoach(
    $createWeeklySchedule: CreateWeeklyScheduleInput!
    $createSubjectSpecialization: CreateSubjecSpecialization!
    $createCoachApplication: CreateCoachApplicationInput!
  ) {
    applyCoach(
      createWeeklySchedule: $createWeeklySchedule
      createSubjectSpecialization: $createSubjectSpecialization
      createCoachApplication: $createCoachApplication
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
  mutation bookLesson($createLesson: CreateLessonInput!, $amount: Float!) {
    bookLesson(createLessonInput: $createLesson, amount: $amount) {
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
export const CREATE_QUESTION = gql`
  mutation makeQuestion($createQuestionInput: CreateQuestionInput!) {
    makeQuestion(createQuestionInput: $createQuestionInput) {
      id
      body
    }
  }
`;
export const ANSWER_QUESTION = gql`
  mutation answerQuestion($answerQuestionInput: CreateAnswerInput!) {
    answerQuestion(createAnswerInput: $answerQuestionInput) {
      ...AnswerParts
    }
  }
  ${ANSWER_FRAGMENT}
`;

export const VOTE_ANSWER = gql`
  mutation voteAnswer($id: String!, $vote: Boolean!) {
    voteAnswer(answer: $id, vote: $vote) {
      id
    }
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation createPaymentIntent($topup: TopUp!) {
    createPaymentIntent(topup: $topup)
  }
`;
export const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $topup: TopUp!
    $transaction: CreateTransactionInput!
  ) {
    createPayment(createTransactionHistoryInput: $transaction, topup: $topup) {
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
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const COACHES = gql`
  query coaches {
    pendingCoaches {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;
export const COACH = gql`
  query coach($id: String!, $dateTo: Float!, $dateFrom: Float!) {
    user(id: $id) {
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
      timeZone
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
      timeZone
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
      image
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
      image
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
      image
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
      image
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
      image
      name
    }
  }
`;
export const DEPARTMENT_BY_ID = gql`
  query getDepartment($id: String!) {
    department(id: $id) {
      id
      name
      image
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
      image
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
  query coachLessons($subject: String) {
    coachLessons(subject: $subject) {
      id
      name
      email
      image
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
export const STUDENT_LESSONS = gql`
  query studentLessons {
    studentLessons {
      id
      name
      image
      email
      lessons_given
    }
  }
`;
export const MY_LESSONS = gql`
  query myLessons($limit: Float) {
    myLessons(limit: $limit) {
      subject {
        name
      }
      coach {
        name
        image
      }
      date
      id
    }
  }
`;
export const STUDENT_METRIC = gql`
  query studentMetrics {
    studentMetrics {
      lessons
      answers
      questions
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

export const QUESTIONS = gql`
  query questions(
    $page: Float
    $limit: Float
    $sort: QuestionSort
    $query: QuestionSearch
  ) {
    questions(page: $page, limit: $limit, sort: $sort, query: $query) {
      ...BasePaginateParts

      questions {
        id
        title
        body
        answers
        subject {
          id
          name
        }
        createdAt
        updatedAt
        user {
          id
          name
        }
      }
    }
  }
  ${BASE_CONNECTION_FRAGMENT}
`;
export const QUESTION = gql`
  query question($id: String!) {
    question(id: $id) {
      id
      title
      body
      # answers
      subject {
        id
        name
      }
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
`;
export const ANSWERS = gql`
  query answers($id: String!) {
    answers(id: $id) {
      ...AnswerParts
    }
  }
  ${ANSWER_FRAGMENT}
`;

export const TRANSACTIONS = gql`
  query transactions {
    myWallet {
      id
      balance
    }

    TransactionHistory: transactions(type: topup) {
      id
      createdAt
      amount
    }
    BookedLessonHistory: transactions(type: booking) {
      id
      createdAt
      amount
    }
  }
`;

export const CHATS = gql`
  query chats {
    chats {
      ...ChatParts
    }
  }
  ${CHAT_FRAGMENT}
`;
export const CHAT = gql`
  query chat($id: String!) {
    chat(id: $id) {
      ...ChatParts
    }
  }
  ${CHAT_FRAGMENT}
`;

export const MESSAGES = gql`
  query messages($id: String!) {
    messages(id: $id) {
      ...MessageParts
    }
  }
  ${MESSAGE_FRAGMENT}
`;
// Subscription
export const ON_MESSAGE = gql`
  subscription onMessageSent($id: String!) {
    onMessageSent(id: $id) {
      ...MessageParts
    }
  }
  ${MESSAGE_FRAGMENT}
`;
export const ON_CHATS = gql`
  subscription onChatCreate {
    onChatCreate {
      ...ChatParts
    }
  }
  ${CHAT_FRAGMENT}
`;
