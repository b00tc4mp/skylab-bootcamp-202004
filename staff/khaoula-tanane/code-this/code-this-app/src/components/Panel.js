import React from 'react'
import './Panel.sass'
import Challenges from './Challenges'
import { Route } from 'react-router-dom'
import Categories from './Categories'
import Challenge from './Challenge'

function Panel(props) {
    return (

        <div className="wrapper">
          <div className="top_navbar">
            <div className="hamburger">
              <div className="one" />
              <div className="two" />
              <div className="three" />
            </div>
            <div className="top_menu">
              <div className="logo">
                CODE THIS
              </div>
              <ul>
                <li><a href="#">
                <span class="material-icons">search</span>
                  </a></li>
                <li><a href="#">
                <span class="material-icons">notifications</span>
                  </a></li>
                <li><a href="#">
                <span class="material-icons">person</span>
                  </a></li>
              </ul>
            </div>
          </div>
          <div className="sidebar">
            <ul>
              <li><a href="#">
                  <span className="icon">
                  <span className="material-icons">emoji_events</span>
                  </span>
                  <span className="title">Challenges</span>
                </a></li>
              <li><a href="#">
              <span class="material-icons">people</span>
                  <span className="title">Face to Face</span>
                </a></li>
              <li><a href="#">
                  <span className="icon"><i className="fa fa-volleyball-ball" /></span>
                  <span className="title">yoquese</span>
                </a></li>
            </ul>
          </div>
          <div className="main_container">
            <div className="first-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit!
            </div>
            <div className="second-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit!
            </div>
            <div className="second-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit!
            </div>
            {/* <Challenges className='item'/> */}
            {/* <Categories/> */}
            <Route path={`${props.match.path}/categories`} component={Categories} />
            <Route path={`${props.match.path}/categories/:category`} component={Challenges} />
            
          </div>
        </div>
        
      );
}
export default Panel