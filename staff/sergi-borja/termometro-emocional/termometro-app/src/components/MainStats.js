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
    const [rolChart, setRolChart] = useState()
    const [memberSelected, setMemberSelected] = useState({})

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
        if (rolChart === 'admin') adminChart()
        if (rolChart === 'member') handleSeeMemberStats(memberSelected)
    }

    const fiveDaysDateArray = (userInfo) => {
        let dateArray = []
        for (let i = days; i > 0; i--) {
            dateArray.push(moment(userInfo.mood[userInfo.mood.length - i].date).format('dddd'))
        }
        return dateArray;
    }

    const fiveDayScoreArray = (userInfo) => {
        let scoreArray = []
        for (let i = days; i > 0; i--) {
            scoreArray.push(userInfo.mood[userInfo.mood.length - i].score)
        }
        return scoreArray;
    }

    const adminChart = () => {
        isAuthenticated(token)
            .then(adminInfo => {
                setRolChart('admin')
                const dateArray = fiveDaysDateArray(adminInfo);
                const scoreArray = fiveDayScoreArray(adminInfo);
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

    const handleSeeMemberStats = (member) => {

        setRolChart('member')
        const dateArray = fiveDaysDateArray(member);
        const scoreArray = fiveDayScoreArray(member);

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
        console.log(dayClicked)
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
                <button className='mainStatsContainer__buttonDaysContainer--yesterday' onClick={() => daysSetter(1)}>Calendario</button>
            </div>
            {days!==1 &&<div className='mainStatsContainer__chartContainer'>
                 <HorizontalBar data={chartData} options={chartOptions.options} height={500} />
            </div>}

            {days===1 && <div className='mainStatsContainer__chartContainer'>
                <Calendar onClickDay={(dayClicked)=>handleDayClicked(dayClicked)}/>
            </div>}

        </section>
    );

}

export default MainStats;

{/* <ul className='familyContainer__ul'>
    <li className='familyContainer__li'>Mis stats<button onClick={adminChart}>VIEW STATS</button></li>
    {memberList && memberList.map((member) => <li className='familyContainer__li'>{member.name} {member && <button onClick={() => handleSeeMemberStats(member)}>VIEW STATS</button>}</li>)}
</ul> */}