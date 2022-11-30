import axios from 'axios'

// The API endpoint where bills are located
const employeesUrl = `http://localhost:8080/api/employeeSelect`

// Gets all bills which belong to a user
const getEmployees = async (employee) => {
    // Get bills of the given user, using query parameter, ?user={user.studentId}
    const response = await axios.get(`${employeesUrlUrl}`)

    // The .data field would now contain the bills of the users
    return response.data
}

// Pays the bill which is specified, after paying, the record of the bill is deleted
// So this translates to a delete request from axios to the bill API endpoint at the backend
const selectEmployee = async (employee) => {
    const response = await axios.delete(`${employeesUrl}/${employee.empId}`)
    return response.data
}

const exportObject = { getEmployees, selectEmployee }

export default exportObject