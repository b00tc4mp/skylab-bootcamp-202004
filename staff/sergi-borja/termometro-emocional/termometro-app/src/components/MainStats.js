import React, { useEffect, useState } from 'react'
import { HorizontalBar, Line, Bar } from 'react-chartjs-2'
import createFamilyList from 'termometro-client-logic/create-family-list'
import retrieveUser from 'termometro-client-logic/retrieve-user'
import './MainStats.sass'
// import Calendar from 'react-calendar'
import { Calendar } from './calendar'
import reactDom from 'react-dom'
const moment = require('moment')
moment.locale('es')


function MainStats({ token, rol }) {

    const [chartData, setChartData] = useState({})
    const [familyList, setFamilyList] = useState()
    const [days, setDays] = useState(5)
    const [rolChart, setRolChart] = useState('admin')
    const [memberSelected, setMemberSelected] = useState({})
    const [displayCalendar, setDisplayCalendar] = useState()
    const [chartOfCalendar, setChartOfCalendar] = useState()
    const [_dayClicked, setDayClicked] = useState()
    const [hasStats, setHasStats] = useState(true)
    const [windowHeigth, setWindowHeigth] = useState()
    const [_windowHeigth, set_WindowHeigth] = useState()
    const [chartFontSize, setChartFontSize] = useState()


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
                        color: 'rgba(0,0,0,1)',
                        fontSize: chartFontSize
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
                        fontSize: chartFontSize
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


    const handleChartCreation = async (member) => {

        const adminInfo = await retrieveUser(token)

        let dateArray;
        let scoreArray;
        let scoreColors;
        let userInfo;

        if (member) userInfo = member
        else userInfo = adminInfo

        if(window.screen.height < 850) setChartFontSize(18)
        else setChartFontSize(27)

        if (_dayClicked) {
            if (window.screen.height < 750) set_WindowHeigth(405)
            else if (window.screen.height < 850) set_WindowHeigth(500)
            else set_WindowHeigth(310)

            let clickDayInfo = userInfo.mood.filter((element) => moment(element.date).format('LL') === moment(_dayClicked).format('LL'))
            if (clickDayInfo.length === 2) {
                dateArray = [moment(clickDayInfo[0].date).format('HH:mm'), moment(clickDayInfo[1].date).format('HH:mm')]
                scoreArray = [clickDayInfo[0].score, clickDayInfo[1].score]
                scoreColors = colorBars(scoreArray)
            } else {
                setHasStats(false)
            }
        } else if (!_dayClicked) {
            if (window.screen.height < 750) setWindowHeigth(430)
            else if (window.screen.height < 850) setWindowHeigth(520)
            else setWindowHeigth(320)
            setChartOfCalendar(false)

            if (days <= (userInfo.mood.length / 2)) {
                setHasStats(true)
                dateArray = settingDateArray(userInfo);
                scoreArray = settingScoreArray(userInfo);
                scoreColors = colorBars(scoreArray)
            } else {
                setHasStats(false)
            }
        }

        setChartData({
            labels: dateArray,
            datasets: [{
                data: scoreArray,
                backgroundColor: scoreColors,
                borderWidth: 4
            }],
        })
    }

    const colorBars = (scoreArray) => {
        let scoreColorsArray = scoreArray.map((score) => {
            if (score > 9) return 'rgba(75, 253, 93, 0.5)'
            else if (score > 8) return 'rgba(111, 239, 75, 0.5)'
            else if (score > 7) return 'rgba(147, 225, 57, 0.5)'
            else if (score > 6) return 'rgba(213, 212, 66, 0.5)'
            else if (score > 5) return 'rgba(234, 197, 35, 0.5)'
            else if (score > 4) return 'rgba(255, 187, 129, 0.5)'
            else if (score > 3) return 'rgba(255, 183, 3, 0.5)'
            else if (score > 2) return 'rgba(255, 140, 107, 0.5)'
            else if (score > 1) return 'rgba(255, 0, 43, 0.5)'
            else if (score > 0) return 'rgba(211, 52, 20, 0.5)'
            // else if(score>0) return 'rgba(37, 247, 72, 0.5)'
        })
        return scoreColorsArray
    }

    const handleChangeChart = ({ target: { value } }) => {
        if (value === 'my_stats') {
            setRolChart('admin')
            handleChartCreation()
        } else {
            setRolChart('member')
            familyList.map(member => {
                if (member.id === value) {
                    setMemberSelected(member)
                    handleChartCreation(member)
                }
            })
        }
    }

    const handleDayClicked = (dayClicked) => {
        setChartOfCalendar(true)
        setDayClicked(dayClicked)
        setDisplayCalendar(false)
    }

    useEffect(() => {
        setHasStats(true)
        if (rolChart === 'admin') handleChartCreation()
        if (rolChart === 'member') handleChartCreation(memberSelected)
    }, [_dayClicked])

    useEffect(() => {
        if (!rol) {
            try {
                createFamilyList(token)
                    .then(familyList => setFamilyList(familyList))
            } catch (error) {
                if (error) throw error
            }
        }
    }, [])

    useEffect(() => {
        if (rolChart === 'admin') handleChartCreation()
        else handleChartCreation(memberSelected)
    }, [days])


    return (
        <section className='mainStatsContainer'>
            <div className='mainStatsContainer__selectContainer'>
                {!rol && <select className='mainStatsContainer__selectContainer--select' onChange={(event) => handleChangeChart(event)}>
                    <option value='my_stats' className='mainStatsContainer__selectContainer--adminOption'>Mis estadísticas</option>
                    {familyList && familyList.map(({ id, name }) => <option value={id} key={id} className='mainStatsContainer__selectContainer--memberOption'>{name}</option>)}
                </select>}
                {rol && <h1 value='my_stats' className='mainStatsContainer__selectContainer--adminOption'>Mis estadísticas</h1>}
            </div>
            <div className='mainStatsContainer__buttonDaysContainer'>
                <button className={`mainStatsContainer__buttonDaysContainer--fiveDays ${days === 5 && !chartOfCalendar && !displayCalendar ? 'white' : ''}`} onClick={() => daysSetter(5)}>5 DÍAS</button>
                <button className={`mainStatsContainer__buttonDaysContainer--fiveTeenDays ${days === 15 && !chartOfCalendar && !displayCalendar ? 'white' : ''}`} onClick={() => daysSetter(15)}>15 DÍAS</button>
                <button className={`mainStatsContainer__buttonDaysContainer--fiveTeenDays ${displayCalendar || chartOfCalendar ? 'white' : ''}`} onClick={() => setDisplayCalendar(true)}>Calendario</button>
            </div>

            {!hasStats && !displayCalendar && <div className='mainStatsContainer__errorFeedback'>¡Ups! Aún no hemos reunido datos suficientes..</div>}

            {!displayCalendar && !chartOfCalendar && !_dayClicked && hasStats && windowHeigth && <div className='mainStatsContainer__chartContainer'>
                <HorizontalBar data={chartData} options={chartOptions.options} height={windowHeigth} />
            </div>}

            {!displayCalendar && chartOfCalendar && _dayClicked && hasStats && _windowHeigth && <div className='mainStatsContainer__chartContainer'>
                <h1 className='mainStatsContainer__chartContainer--dateTitle'>{moment(_dayClicked).format('ll')}</h1>
                <Bar data={chartData} options={chartOptions.options} height={_windowHeigth} />
            </div>}

            {displayCalendar && <div className='mainStatsContainer__calendarContainer'>
                <Calendar className='mainStatsContainer__calendarContainer--calendar' memberSelected={memberSelected} onClickDay={(dayClicked) => handleDayClicked(dayClicked)} />
            </div>}
        </section>
    );



}

export default MainStats;








