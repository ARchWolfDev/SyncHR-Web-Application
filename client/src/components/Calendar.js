import React, { useEffect, useState } from 'react'
import { useModalContext } from './ModalProvider'
import CalendarModalBody from './CalendarModalBody'

function Calendar() {

    const {handleOpenModal} = useModalContext()
    const [currentDate, setCurrentDate] = useState( new Date())
    const [timesheet, setTimesheet] = useState([])

    useEffect(() => {
        const fetchTimesheet = async () => {
            try {
                const respone = await fetch('http://127.0.0.1:5000/api/timesheet', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    } 
                })
                const data = await respone.json()
                setTimesheet(data)
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchTimesheet()
    }, [])

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1)
            return newDate
        })
    }

    const handleNextMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1)
            return newDate
        })
    }

    const handleDate = (date) => {
        handleOpenModal(date, <CalendarModalBody selectedDate={date}/>, 'lg')
    }

    const renderHeader = () => {
        return (
            <div className='calendar-header w-box p-10'>
                <button onClick={handlePreviousMonth} className='btn btn-sm'><i className="fa-solid fa-chevron-left"></i></button>
                <h2>{currentDate.toLocaleString('default', {month: 'long'})}  {currentDate.getFullYear()}</h2>
                <button onClick={handleNextMonth} className='btn btn-sm'><i className="fa-solid fa-chevron-right"></i></button>
            </div>
        )
    }

    const renderDays = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return (
            <div className='row days-header'>
                {
                    days.map(day => (
                        <div className='col day' key={day}>{day}</div>
                    ))
                }
            </div>
        )
    }

    const renderCells = () => {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        const startDate = firstDay.getDay()
        const endDate = lastDay.getDate()

        const rows = []
        let cells = []

        for (let i = 0; i < startDate; i++){
            cells.push(<div className='col cell cell-empty' key={`empty=${i}`}></div>)
        }

        const today = new Date();
        const todayDate = today.getDate()
        const todayMonth = today.getMonth()
        const todayYear = today.getFullYear()

        // isDateinArray ?? 

        const startEndWeek = (selectedDate) => {
            if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6){
                return {color: "red"}
            }
            return {color:""}
        }

        for (let d = 1; d <= endDate; d++) {
            const isToday = d === todayDate && currentDate.getMonth() === todayMonth && currentDate.getFullYear() === todayYear
            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d)

            cells.push(
                <div 
                    className={`col cell ${isToday?'today':''}`} 
                    style={startEndWeek(selectedDate)}
                    onClick={() => handleDate(selectedDate.toDateString())}
                    key={d}
                >
                    {d}
                </div>
            )

            if ((d + startDate) % 7 === 0) {
                rows.push(<div className='row calendar-row' key={d}>{cells}</div>)
                cells = []
            } 
        }
        while (cells.length < 7) {
            cells.push(<div className="col cell cell-empty" key={`empty-end-${cells.length}`}></div>)
        }
        const hasNonEmptyCell = cells.some(cell => !cell.props.className.includes("cell-empty"));
        if (hasNonEmptyCell) {
            rows.push(<div className="row calendar-row" key="end">{cells}</div>);
        }
        return <div>{rows}</div>;
    }

    

  return (
    <div>
        {renderHeader()}
        <div>
            {renderDays()}
            {renderCells()}
        </div>
    </div>
  )
}

export default Calendar
