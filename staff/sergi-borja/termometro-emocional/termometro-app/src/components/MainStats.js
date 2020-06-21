import React, { useEffect, useState } from 'react'
import { HorizontalBar, Line } from 'react-chartjs-2'
import createMemberList from 'termometro-client-logic/create-member-list'
import isAuthenticated from 'termometro-client-logic/is-authenticated'
import './MainStats.sass'
import Calendar from 'react-calendar'
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
    const [hasStats, setHasStats] = useState(true)

    const chartOptions = {
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 10,
                        fontSize: 20
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        mirror: true,
                        beginAtZero: true,
                        max: 10,
                        fontSize: 15
                    }
                }]
            },
        }
    }

    const daysSetter = (days) => {
        setDays(days)
        setChartOfCalendar(false)
        setDisplayCalendar(false)
        setDayClicked(false)
    }

    useEffect(() => {
        if (rolChart === 'admin') adminChart()
        if (rolChart === 'member') handleSeeMemberStats(memberSelected, _dayClicked)
    }, [_dayClicked])

    const settingDateArray = (userInfo) => {
        const { mood } = userInfo
        let dateArray = []
        let acc = 1
        while (dateArray.length < days) {
            if (moment(mood[mood.length - acc].date).format('L') !== moment(mood[mood.length - (acc + 1)].date).format('L')) {
                dateArray.unshift(moment(mood[mood.length - acc].date).format('MMM Do'))
            }
            acc++
        }
        return dateArray;
    }

    const settingScoreArray = (userInfo) => {
        const { mood } = userInfo
        let scoreArray = []
        let i = 1
        while (scoreArray.length < days) {
            if (moment(mood[mood.length - i].date).format('L') === moment(mood[mood.length - (i + 1)].date).format('L')) {
                scoreArray.unshift((mood[mood.length - i].score + mood[mood.length - (i + 1)].score) / 2)
            }
            if (i === 1) {
                if (moment(mood[mood.length - i].date).format('L') !== moment(mood[mood.length - (i + 1)].date).format('L')) {
                    scoreArray.unshift((mood[mood.length - i].score))
                }
            } else {
                if (moment(mood[mood.length - i].date).format('L') !== moment(mood[mood.length - (i + 1)].date).format('L') && moment(mood[mood.length - i].date).format('L') !== moment(mood[mood.length - (i - 1)].date).format('L')) {
                    scoreArray.unshift((mood[mood.length - i].score))
                }
            }
            i++
        }
        return scoreArray;
    }


    const adminChart = () => {
        isAuthenticated(token)
            .then(adminInfo => {
                let dateArray;
                let scoreArray;
                if (_dayClicked) {
                    let clickDayInfo = adminInfo.mood.filter((element) => moment(element.date).format('LL') === moment(_dayClicked).format('LL'))
                    dateArray = [moment(clickDayInfo[0].date).format('HH:mm'), moment(clickDayInfo[1].date).format('HH:mm')]
                    scoreArray = [clickDayInfo[0].score, clickDayInfo[1].score]
                } else if (!_dayClicked) {
                    setChartOfCalendar(false)
                    if(days<=(adminInfo.mood.length/2)){
                    setHasStats(true)   
                    dateArray = settingDateArray(adminInfo);
                    scoreArray = settingScoreArray(adminInfo);
                    } else {
                        setHasStats(false)
                    }
                }
                setChartData({
                    labels: dateArray,
                    datasets: [{
                        // label: 'level of mood',
                        data: scoreArray,
                        borderWidth: 4
                    }]
                })

            })
    }

    const handleSeeMemberStats = (member) => {
        let dateArray; 
        let scoreArray;

        if (_dayClicked) {
            let clickDayInfo = member.mood.filter((element) => moment(element.date).format('LL') === moment(_dayClicked).format('LL'))
            dateArray = [moment(clickDayInfo[0].date).format('HH:mm'), moment(clickDayInfo[1].date).format('HH:mm')]
            scoreArray = [clickDayInfo[0].score, clickDayInfo[1].score]
        } else if (!_dayClicked) {
            setChartOfCalendar(false)
            if(days<=(member.mood.length/2)){
            setHasStats(true)
            dateArray = settingDateArray(member);
            scoreArray = settingScoreArray(member);
            } else {
                setHasStats(false)
            }
        }

        setChartData({
            labels: dateArray,
            datasets: [{
                // label: 'level of mood',
                data: scoreArray,
                fillColor: [
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
        if(rolChart==='admin') adminChart()
        daysSetter(days)
    }, [days])

    const handleChangeChart = ({ target: { value } }) => {

        if (value === 'my_stats') {
            setRolChart('admin')
            adminChart()
        } else {
            setRolChart('member')
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
                    <option value='my_stats' className='mainStatsContainer__selectContainer--adminOption'>Mis estadísticas</option>
                    {memberList && memberList.map(({ id, name }) => <option value={id} className='mainStatsContainer__selectContainer--memberOption'>{name}</option>)}
                </select>
            </div>
            <div className='mainStatsContainer__buttonDaysContainer'>
                <button className={`mainStatsContainer__buttonDaysContainer--fiveDays ${days === 5 && !chartOfCalendar && !displayCalendar ? 'white' : ''}`} onClick={() => daysSetter(5)}>5 DAYS</button>
                <button className={`mainStatsContainer__buttonDaysContainer--fiveTeenDays ${days === 15 && !chartOfCalendar && !displayCalendar ? 'white' : ''}`} onClick={() => daysSetter(15)}>15 DAYS</button>
                <button className={`mainStatsContainer__buttonDaysContainer--fiveTeenDays ${displayCalendar || chartOfCalendar ? 'white' : ''}`} onClick={() => setDisplayCalendar(true)}>Calendario</button>
            </div>

            {!hasStats && !displayCalendar && <div><h1>ESTE USUARIO NO TIENE ESTADISTICAS SUFICIENTES</h1></div>}

            {!displayCalendar && !chartOfCalendar && !_dayClicked && hasStats && <div className='mainStatsContainer__chartContainer'>
                <HorizontalBar data={chartData} options={chartOptions.options} height={500} />
            </div>}

            {!displayCalendar && chartOfCalendar && _dayClicked && hasStats && <div className='mainStatsContainer__chartContainer'>
                <h1 className='mainStatsContainer__chartContainer--dateTitle'>{moment(_dayClicked).format('ll')}</h1>
                <Line data={chartData} options={chartOptions.options} height={500} />
            </div>}

            {displayCalendar && <div className='mainStatsContainer__calendarContainer'>
                <Calendar className='mainStatsContainer__calendarContainer--calendar' tileClassName={handleTileBackground} onClickDay={(dayClicked) => handleDayClicked(dayClicked)} />
            </div>}

        </section>
    );

}

export default MainStats;






