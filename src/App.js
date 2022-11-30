import { useState, useEffect } from 'react'

import loginService from './services/login'
import salaryService from './services/salaries'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import Salaries from "./components/Salaries"
import employeeSelect from "./services/employeeSelect";
import employeeSelectService from "./services/employeeSelect";

const App = () => {
  // user state will store the logged in user object, if no login has been done yet then it will be null
  const [ user, setUser ] = useState(null)

  // Will store the salaries of the logged in user
  const [ salaries, setSalaries ] = useState([])

  const [employees,setEmployees] = useState([])

  // These states are used to control the notifications that show up at the top of the screen for events like
  // login, signup, watchlist creation, etc.
  const [ notification, setNotification ] = useState(null)
  const [ notificationType, setNotificationType ] = useState(null)

  // Create a notification at the top of the screen with given message for 10 seconds
  // Notifications are of two types, "error" and "success"
  // The appearance of these two notifications can be adjusted via the index.css file
  const notificationHandler = (message, type) => {
    setNotification(message)
    setNotificationType(type)

    setTimeout(() => {
      setNotificationType(null)
      setNotification(null)
    }, 3000)
  }

  // Function that handles login of users
  const handleLogin = async (credentials) => {
    try {
      const userObject = await loginService.login(credentials)
      setUser(userObject)
      window.localStorage.setItem('loggedInUser', JSON.stringify(userObject))

      notificationHandler(`Logged in successfully as ${userObject.first_name}`, 'success')
      setSalaries([])//setEmployees([])
    }
    catch (exception) {
      notificationHandler(`Log in failed, check username and password entered`, 'error')
    }
  }

  //-------------------------------------------------------------------------------------------------------
  // Function that selects an employee
  const selectEmployee = async (employeeObject) => {
    try {
      // Call paySalary() at the backend
      await employeeSelectService.selectEmployee(employeeObject)

      // On successful completion of the above method, iterate through all the salaries and only retain those salaries
      // which don't have ID equal to the salaryObject's ID, i.e. the ID of the salary that's just been paid/deleted
      setEmployees(employees.filter(employee => employee.empId !== employeeObject.empId))

      notificationHandler(`Successfully selected "${employeeObject.first_name}" `, 'success')
    }
    catch (exception) {
      notificationHandler(`Failed to select the "${employeeObject.first_name}"`, 'error')
    }
  }
  //------------------------------------------------------------------------------------------------------------

  // Function that pays a salary using the salaryObject that is passed to the function
  const paySalary = async (salaryObject) => {
    try {
      // Call paySalary() at the backend
      await salaryService.paySalary(salaryObject)

      // On successful completion of the above method, iterate through all the salaries and only retain those salaries
      // which don't have ID equal to the salaryObject's ID, i.e. the ID of the salary that's just been paid/deleted
      setSalaries(salaries.filter(employeeSalary => employeeSalary.sId !== salaryObject.sId))

      notificationHandler(`Successfully paid the "${salaryObject.description}" salary`, 'success')
    }
    catch (exception) {
      notificationHandler(`Failed to pay the "${salaryObject.description}" salary successfully`, 'error')
    }
  }


  // Effect Hook that fetches a user's salaries
  // If "user" state changes, then the new salaries must be fetched.
  // This is why "user" is part of the dependency array of this hook
  // MIGHT HAVE TO CHANGE THIS LATER TO PROMISE CHAINING IF IT FAILS
  useEffect(() => {
      async function fetchData() {
        if (user) {
          const salaries = await salaryService.getUserSalaries(user)
          setSalaries(salaries)
        }
      }
      fetchData()
  }, [user])
  //---------------------------------------------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      if (user) {
        const employees = await employeeSelectService.getEmployees(user)
        setEmployees(employees)
      }
    }
    fetchData()
  }, [user])
  //-----------------------------------------------------------------------------------------------


  // Effect Hook that parses the local storage for 'loggedInUser' and sets the "user" state if a valid match is found
  // This enables user to login automatically without having to type in the credentials. Caching the login if you will.
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser)
      setUser(JSON.parse(loggedInUser))
  }, [])

  return (
    <div>
      {/* Header of the page */}
      <div className='text-center page-header p-2 regular-text-shadow regular-shadow'>
          <div className='display-4 font-weight-bold'>
            Salary - Payments
          </div>
      </div>
      
      {/* Notification component that will render only when the notification state is not null */}
      <Notification notification={notification} type={notificationType} />

      {
        /* Show Login form when no login has happened */
        user === null && 
        <LoginForm startLogin={handleLogin}/>
      }

      {
        /* Show NavBar when login has happened */
        user !== null && 
        <NavBar user={user} setUser={setUser}/>
      } 

      {
        /* Show Salaries of the User when login has happened */
        user !== null &&
        <Salaries
          salaries={salaries}
          paySalary={paySalary}
        />
      }
    </div>
  )
}

export default App;
