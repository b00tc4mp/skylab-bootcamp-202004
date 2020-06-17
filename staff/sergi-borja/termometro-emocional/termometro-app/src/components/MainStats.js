import React, { useEffect, useState } from 'react'
import { HorizontalBar, Line } from 'react-chartjs-2'
import createMemberList from 'termometro-client-logic/create-member-list'
import isAuthenticated from 'termometro-client-logic/is-authenticated'
import './MainStats.sass'
import Calendar from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
const moment = require('moment')


function MainStats({ token }) {

    const [chartData, setChartData] = useState({})
    const [memberList, setMemberList] = useState()
    const [days, setDays] = useState(5)
    const [rolChart, setRolChart] = useState('admin')
    const [memberSelected, setMemberSelected] = useState({})
    const [displayCalendar, setDisplayCalendar] = useState()
    const [chartOfCalendar, setChartOfCalendar] = useState()
    const [_dayClicked, setDayClicked] = useState()

    const chartOptions = {
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 10
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 10
                    }
                }]
            },
        }
    }

    const daysSetter = (days) => {
        setDays(days)
        setChartOfCalendar(false)
        setDisplayCalendar(false)
        setDayClicked()
        if (rolChart === 'admin') adminChart()
        if (rolChart === 'member') handleSeeMemberStats(memberSelected)
    }

    const settingDateArray = (userInfo) => {
        let dateArray = []
        let _days = days * 2
        for (let i = _days; i > 0; i--) {
            if (i % 2 === 0) dateArray.push(moment(userInfo.mood[userInfo.mood.length - i].date).format('dddd'))
        }
        return dateArray;
    }

    const settingScoreArray = (userInfo) => {
        let scoreArray = []
        let _days = days * 2
        for (let i = _days; i > 0; i--) {
            if (i % 2 === 0) {
                scoreArray.push((userInfo.mood[userInfo.mood.length - i].score + userInfo.mood[userInfo.mood.length - (i - 1)].score) / 2)
            }
        }
        return scoreArray;
    }

    const adminChart = (dayClicked) => {
        isAuthenticated(token)
            .then(adminInfo => {
                setRolChart('admin')
                let dateArray;
                let scoreArray;
                if (dayClicked) {
                    let clickDayInfo = adminInfo.mood.filter((element) => moment(element.date).format('LL') === moment(dayClicked).format('LL'))
                    dateArray = [clickDayInfo[0].date, clickDayInfo[1].date]
                    scoreArray = [clickDayInfo[0].score, clickDayInfo[1].score]
                } else if (!dayClicked) {
                    setChartOfCalendar(false)
                    dateArray = settingDateArray(adminInfo);
                    scoreArray = settingScoreArray(adminInfo);
                }
                setChartData({
                    labels: dateArray,
                    datasets: [{
                        label: 'level of mood',
                        data: scoreArray,
                        backgroundColor: [
                            'rgba(76,192,192,0.6)'
                        ],
                        borderWidth: 4
                    }]
                })
            })
    }

    const handleSeeMemberStats = (member, dayClicked) => {
        setRolChart('member')
        let dateArray;
        let scoreArray;

        if (dayClicked) {
                let clickDayInfo = member.mood.filter((element) => moment(element.date).format('LL') === moment(dayClicked).format('LL'))
                dateArray = [clickDayInfo[0].date, clickDayInfo[1].date]
                scoreArray = [clickDayInfo[0].score, clickDayInfo[1].score]
        } else if (!dayClicked) {
            setChartOfCalendar(false)
            dateArray = settingDateArray(member);
            scoreArray = settingScoreArray(member);
        }

        setChartData({
            labels: dateArray,
            datasets: [{
                label: 'level of mood',
                data: scoreArray,
                backgroundColor: [
                    'rgba(76,192,192,0.6)'
                ],
                borderWidth: 4
            }],
        })
    }

    useEffect(() => {
        try {
            createMemberList(token)
                .then(familyList => setMemberList(familyList))
        } catch (error) {
            if (error) throw error
        }
    }, [])

    useEffect(() => {
        adminChart()
        daysSetter(days)
    }, [days])

    const handleChangeChart = ({ target: { value } }) => {

        if (value === 'my_stats') adminChart()
        else {
            memberList.map(member => {
                if (member.id === value) {
                    setMemberSelected(member)
                    handleSeeMemberStats(member)
                }
            })
        }
    }

    const handleDayClicked = (dayClicked) => {
        setChartOfCalendar(true)
        setDayClicked(dayClicked)
        if (rolChart === 'admin') adminChart(dayClicked)
        if (rolChart === 'member') handleSeeMemberStats(memberSelected, dayClicked)
        setDisplayCalendar(false)
    }

    const handleTileBackground = ({ date, view }) => {
        // console.log(date)
        // console.log(view)
    }


    return (
        <section className='mainStatsContainer'>
            <div className='mainStatsContainer__selectContainer'>
                <select className='mainStatsContainer__selectContainer--select' onChange={(event) => handleChangeChart(event)}>
                    <option value='my_stats' className='mainStatsContainer__selectContainer--adminOption'>Mis stats</option>
                    {memberList && memberList.map(({ id, name }) => <option value={id} className='mainStatsContainer__selectContainer--memberOption'>{name}</option>)}
                </select>
            </div>
            <div className='mainStatsContainer__buttonDaysContainer'>
                <button className='mainStatsContainer__buttonDaysContainer--fiveDays' onClick={() => daysSetter(5)}>5 DAYS</button>
                <button className='mainStatsContainer__buttonDaysContainer--fiveTeenDays' onClick={() => daysSetter(15)}>15 DAYS</button>
                <button className='mainStatsContainer__buttonDaysContainer--yesterday' onClick={() => setDisplayCalendar(true)}>Calendario</button>
            </div>
            {!displayCalendar && !chartOfCalendar && !_dayClicked && <div className='mainStatsContainer__chartContainer'>
                <HorizontalBar data={chartData} options={chartOptions.options} height={570} />
            </div>}

            {!displayCalendar && chartOfCalendar && _dayClicked && <div className='mainStatsContainer__chartContainer'>
                <h1>{moment(_dayClicked).format('ll')}</h1>
                <Line data={chartData} options={chartOptions.options} height={570} />
            </div>}

            {displayCalendar && <div className='mainStatsContainer__calendarContainer'>
                <Calendar className='mainStatsContainer__calendarContainer--calendar' tileClassName={handleTileBackground} onClickDay={(dayClicked) => handleDayClicked(dayClicked)} />
            </div>}

        </section>
    );

}

export default MainStats;

