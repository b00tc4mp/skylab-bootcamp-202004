import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
// import isAuthenticated from 'termometro-client-logic/is-authenticated'
import createMemberList from 'termometro-client-logic/create-member-list'
import isAuthenticated from 'termometro-client-logic/is-authenticated'

function MainStats({ token }) {

    const [chartData, setChartData] = useState({})
    const [memberList, setMemberList] = useState()
    const [adminInfo, setAdminInfo] = useState()

    const Chart = () => {
        isAuthenticated(token)
            .then(adminInfo => {
                setChartData({
                    labels: [adminInfo.mood[0].date, adminInfo.mood[1].date, adminInfo.mood[2].date, adminInfo.mood[3].date, adminInfo.mood[4].date],
                    datasets: [{
                        label: 'level of mood',
                        data: [adminInfo.mood[0].score, adminInfo.mood[1].score, adminInfo.mood[2].score, adminInfo.mood[3].score, adminInfo.mood[4].score],
                        backgroundColor: [
                            'rgba(76,192,192,0.6)'
                        ],
                        borderWidth: 4
                    }]
                })
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
        Chart()
    }, [])



    return (
        <section className='mainStatsContainer'>
            <ul className='familyContainer__ul'>
                {memberList && memberList.map((member) => <li className='familyContainer__li'>{member.name}</li>)}
            </ul>
            <div>
                <Line data={chartData} />
            </div>
        </section>
    );

}

export default MainStats;
