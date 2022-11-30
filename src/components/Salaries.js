import React from 'react'
import Salary from './Salary'

/*
  This component is used for rendering the "Salaries" view which contains each Salary of the Student
  Each Salary is its own component
  
  salaries: Collection of salaries of the given Student
  paySalary: Method that uses the axios service to pay the specified salary, i.e. send a DELETE request
*/
const Salaries = ({ salaries, paySalary }) => {
    // If there's no Salaries for the student, then render nothing. Can instead render a message like "No Salaries Remaining"
    if (salaries === [])
        return null

    return (
        <div className='m-5 p-2 rounded regular-shadow' id="salaries">
            <h2 className='ml-2'>Your Salaries</h2>
            <table cellPadding={10}>
                <tr>
                    <th>Salary ID</th>
                    <th>Salary Amount</th>
                    <th>Salary Description</th>
                    <th>Salary Date</th>
                    <th>Employee ID</th>
                </tr>
                {
                    // Render each Salary as its separate component and for this you use the map() method
                    // Whenever you use the map() method to render a collection of Components, React requires that you specify a unique
                    // attribute of each component in this collection and for this case, we are using the id of each Salary as the key
                    // for React to uniquely identify each Salary
                    // We also pass on the Salary object that has to be rendered by the component and the paySalary method that will
                    // execute the payment
                    salaries.map(b =>
                        <Salary
                            employeeSalary={b}
                            key={b.sId}
                            paySalary={paySalary}
                        />
                    )
                }
            </table>
        </div>
    )
}

export default Salaries