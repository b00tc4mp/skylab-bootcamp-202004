import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
// import isAuthenticated from 'termometro-client-logic/is-authenticated'
import createMemberList from 'termometro-client-logic/create-member-list'
import isAuthenticated from 'termometro-client-logic/is-authenticated'
const moment = require('moment')

function MainStats({ token }) {

    const [chartData, setChartData] = useState({})
    const [memberList, setMemberList] = useState()
    const [adminInfo, setAdminInfo] = useState()

    const fiveDaysDateArray = (userInfo) => {
        let dateArray = []
        for (let i = 5; i > 0; i--) {
            dateArray.push(moment(userInfo.mood[userInfo.mood.length - i].date).format('dddd'))
        }
        return dateArray;
    }

    const fiveDayScoreArray = (userInfo) => {
        let scoreArray = []
        for (let i = 5; i > 0; i--) {
            scoreArray.push(userInfo.mood[userInfo.mood.length - i].score)
        }
        return scoreArray;
    }

    const adminChart = () => {
        isAuthenticated(token)
            .then(adminInfo => {
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
            }]
        })
    }

    useEffect(() => {
        try {
            isAuthenticated(token)
                .then(adminInfo => setAdminInfo(adminInfo))
            createMemberList(token)
                .then(familyList => setMemberList(familyList))
        } catch (error) {
            if (error) throw error
        }
    }, [])

    useEffect(() => {
        adminChart()
    }, [])


    const handleGoToFilterDays = () => {
        console.log('days')
        
    }

    return (
        <section className='mainStatsContainer'>
            <ul className='familyContainer__ul'>
                <li className='familyContainer__li'>Mis stats<button onClick={adminChart}>VIEW STATS</button></li>
                {memberList && memberList.map((member) => <li className='familyContainer__li'>{member.name} {member && <button onClick={() => handleSeeMemberStats(member)}>VIEW STATS</button>}</li>)}
            </ul>
            <select className='registerContainer__emailInput' onChange={handleGoToFilterDays()} required>
                <option value='fiveDays'>5 días</option>
                <option value='fiveTeenDays'>15 días</option>
                <option value='OneDay'>1 día</option>
            </select>
            <div>
                <Line data={chartData} />
            </div>
        </section>
    );

}

export default MainStats;
