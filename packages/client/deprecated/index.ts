//   const [state, setstate] = useState({
//         ...days.map((day) => {
//             return { [`${day}Start`]: 0 }
//         }),
//         ...days.map((day) => {
//             return ({ [`${day}End`]: 1 })
//         })
//     })

//     const onChangeHandler = (e: any) => {
//         const value = e.target.value
//         console.log(value, e.target.name);
//         if ((e.target.name as string).includes('End')) {
//             if (value <= 24 && value >= 1) {
//                 setstate({
//                     ...state,
//                     [e.target.name]: value
//                 })
//             }
//         }
//         else if (e.target.name.includes('Start')) {
//             if (value <= 23 && value >= 0) {
//                 setstate({
//                     ...state,
//                     [e.target.name]: value
//                 })
//             }
//         }

//     }

//     const onWeeklyScheduleSubmit = () => {
//         const schedule = state.map((oneState) => {
//             const key = Object.keys(oneState)[0]
//             console.log(Object.keys(oneState));
//             const day = key.

//                 /*
//                 * get the name of the state
//                  cut it to get the day
//                  convert the value of the day to the values name
//                 */
//                 return {
//                     day:
//             }
//         })

//     }
//  {days.map(day => {
//                 return (
//                     <tr className="text-center" key={day} >
//                         <td className='capitalize '>{day}</td>
//                         <td className='p-2'><input className='rounded-md outline-none shadow-md'
//                             onChange={onChangeHandler}
//                             value={state[`${day}Start`]}
//                             type='number' name={`${day}Start`} /> </td>
//                         <td> <input
//                             className='rounded-md outline-none shadow-md py-2'
//                             onChange={onChangeHandler}
//                             value={state[`${day}End`]}
//                             type='number' name={`${day}End`} /> </td>
//                     </tr>
//                 )
//             })}
