import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image

} from "react-native";

import Navbar from "../Navbar";
import SideBar from "../SideBar"
import styles from './styles'
import Add from '../Add'
import Users from "../Users";

function Manager({ role, onGoToManager, onGoToCalendar, onGoToCharts, onGoToForecast, onGoToGreenhouse, onGoToLogout }) {
  const [displayed, setSide] = useState(false);
  const [view, setView] = useState('manager')
  const [error, setError] = useState('')

  const handleSide = () => setSide(!displayed);

  const onBack = () => {
    setView('manager')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar onDisplaySide={handleSide} />

      {displayed && <SideBar role={role} onGoToCalendar={onGoToCalendar} onGoToManager={onGoToManager} onGoToCharts={onGoToCharts} onGoToGreenhouse={onGoToGreenhouse} onGoToForecast={onGoToForecast} onGoToLogout={onGoToLogout} />}
      {view === 'manager' && (<>
        <TouchableOpacity onPress={() => setView('add')}>
          <Image source={require('../../../assets/images/admin.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.text}>Add user</Text>
        <TouchableOpacity onPress={() => setView('users')}>
          <Image source={require('../../../assets/images/user.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.text}>Users</Text>
      </>
      )}
      {view === 'add' && <Add handleGoToBack={onBack} />}
      {view === 'users' && <Users handleGoToBack={onBack} />}

    </SafeAreaView>
  );
}



export default Manager;
