import React, { useState, useEffect } from 'react'
// import './Panel.sass'
import Challenges from './Challenges'
import { Route } from 'react-router-dom'
import Categories from './Categories'
import Profile from './Profile'
import { Link } from 'react-router-dom'
import {retrieveUser} from 'code-this-client-logic'
import CreateChallenge from './CreateChallenge'
import CreateCategory from './ CreateCategory'


function Panel(props) {
  const [burger, setBurger] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    handleRetrieveUser()
  }, [])  

  const handleRetrieveUser = () => {
      retrieveUser().then(_user => {
        setUser(_user)
      }).catch(() => props.history.push('/signin'))
  }

  const isAdmin = user?.role === 'admin'

    return (<>
        {user && (
          <>
            <div className="header">
			<div className="logo">
				<i className="fa fa-tachometer"></i>
				<span>Brand</span>
			</div>
			<a href="#" className="nav-trigger"><span></span></a>
		</div>
		<div className="side-nav">
			<div className="logo">
        <Link to='/panel/profile'>
				  <i className="fa fa-tachometer"></i>
        </Link>
				<span>Brand</span>
			</div>
			<nav>
				<ul>
					<li>
						<a href="#">
							<span><i className="fa fa-user"></i></span>
							<span>Users</span>
						</a>
					</li>
					<li>
						<a href="#">

							<span><i className="fa fa-envelope"></i></span>
							<span>Messages</span>
						</a>
					</li>
					<li className="active">
						<a href="#">
							<span><i className="fa fa-bar-chart"></i></span>
							<span>Analytics</span>
						</a>
					</li>
					<li>
						<a href="#">
							<span><i className="fa fa-credit-card-alt"></i></span>
							<span>Payments</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
		<div className="main-content">
        {isAdmin && (
          <div className="dashboard">
                <Route path={`${props.match.path}/challenges`} component={CreateChallenge} />
                <Route path={`${props.match.path}/categories`} component={CreateCategory} />
                <Route path="/reload" component={null} key="reload" />
          </div>
        )}
        {!isAdmin && (
          <>
          <div className="categories-panel">
                <Route path={`${props.match.path}/categories`} component={Categories} />
            </div>
            <Route path={`${props.match.path}/categories/:category`} component={Challenges} />
          </>
        )}
		</div>
          </>
        )}
    </>);
}
export default Panel


/*

function Panel(props) {
  const [burger, setBurger] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    handleRetrieveUser()
  }, [])  

  const handleRetrieveUser = async ()=> {
      const _user = await retrieveUser()
      setUser(_user)
  }

  const isAdmin = user?.role === 'admin'

    return (

        <div className="wrapper">
          <div className="top_navbar">
            <div className="hamburger" onClick={()=>setBurger(!burger)} >
              <div className="one" />
              <div className="two" />
              <div className="three" />
            </div>
            <div className="top_menu">
              <div className="logo">
                CODE THIS
              </div>
              <ul>
                <li>
                <Link to='/panel/profile'>
                  <span className="material-icons" >person</span>
                </Link>
                  </li>
              </ul>
            </div>
          </div>
          <div className={burger?"sidebar sidebar--active" : "sidebar"} >
            <ul>
              <li>
                  <span className="icon">
                  <Link to='/panel/categories'>
                  <span className="title">Categories</span>
                  <span class="material-icons">category</span>
                </Link>
                  </span>
                </li>
                {isAdmin && <li>
                  <span className="icon">
                  <Link to='/panel/challenges'>
                  <span className="title">Challenges</span>
                  <span className="material-icons">emoji_events</span>
                </Link>
                  </span>
                </li>}
              <li><a href="#">
                  <span className="title">Face to Face</span>
              <span className="material-icons">people</span>
                </a></li>
              <li><a href="#">
                  <span className="title">Something else</span>
                </a></li>
            </ul>
          </div>
          <div className="main_container">
            <div className="first-item">
            <Route path={`${props.match.path}/profile`} component={Profile} />

            </div>
            <div className="second-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit!
            </div>
            <div className="second-item">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit!
            </div>

            {
              isAdmin ? (
                  <div className="item">
                    <Route path={`${props.match.path}/challenges`} component={CreateChallenge} />
                    <Route path={`${props.match.path}/categories`} component={CreateCategory} />
                    <Route path="/reload" component={null} key="reload" />

                  </div>
                ) : (
                  <>
                  <Route path={`${props.match.path}/categories`} component={Categories} />
                  <Route path={`${props.match.path}/categories/:category`} component={Challenges} />
                  </>
              )
            }
            
          </div>
        </div>
        
      );
}
export default Panel

*/