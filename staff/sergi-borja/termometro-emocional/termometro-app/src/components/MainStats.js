import React, { useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2'
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

    const chartOptions = {
        options: {
            scales: {
                xAxes: [{
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
        setDisplayCalendar(false)
        if (rolChart === 'admin') adminChart()
        if (rolChart === 'member') handleSeeMemberStats(memberSelected)
    }

    const settingDateArray = (userInfo) => {
        let dateArray = []
        let _days = days*2
        for (let i = _days; i > 0; i--) {
            if(i%2 === 0) dateArray.push(moment(userInfo.mood[userInfo.mood.length - i].date).format('dddd'))
        }
        return dateArray;
    }

    const settingScoreArray = (userInfo) => {
        let scoreArray = []
        let acc = 0;
        let _days = days*2
        for (let i = _days; i > 0; i--) {
            if(i%2===0) {
                scoreArray.push((userInfo.mood[userInfo.mood.length - i].score + userInfo.mood[userInfo.mood.length - (i-1)].score)/2)
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
                }
                if(!dayClicked){ 
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
        }
        if(!dayClicked){ 
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
        if (rolChart === 'admin') adminChart(dayClicked)
        if (rolChart === 'member') handleSeeMemberStats(memberSelected, dayClicked)
        setDisplayCalendar(false)
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
                {/* <button className='mainStatsContainer__buttonDaysContainer--yesterday' onClick={() => daysSetter(1)}>Calendario</button> */}
            </div>
            {!displayCalendar && <div className='mainStatsContainer__chartContainer'>
                <HorizontalBar data={chartData} options={chartOptions.options} height={500} />
            </div>}

            {displayCalendar && <div className='mainStatsContainer__chartContainer'>
                <Calendar onClickDay={(dayClicked) => handleDayClicked(dayClicked)} />
            </div>}

        </section>
    );

}

export default MainStats;

{/* <ul className='familyContainer__ul'>
    <li className='familyContainer__li'>Mis stats<button onClick={adminChart}>VIEW STATS</button></li>
    {memberList && memberList.map((member) => <li className='familyContainer__li'>{member.name} {member && <button onClick={() => handleSeeMemberStats(member)}>VIEW STATS</button>}</li>)}
</ul> */}

