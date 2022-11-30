import axios from 'axios'

// The API endpoint where bills are located
const salariesUrl = `http://localhost:8080/api/employeeSalary`

// Gets all bills which belong to a user
const getUserSalaries = async (employee) => {
    // Get bills of the given user, using query parameter, ?user={user.studentId}
    const response = await axios.get(`${salariesUrl}?empId=${employee.empId}`)

    // The .data field would now contain the bills of the users
    return response.data
}

// Pays the bill which is specified, after paying, the record of the bill is deleted
// So this translates to a delete request from axios to the bill API endpoint at the backend
const paySalary = async (employeeSalary) => {
    const response = await axios.delete(`${salariesUrl}/${employeeSalary.sId}`)
    return response.data
}

const exportObject = { getUserSalaries, paySalary }

export default exportObject