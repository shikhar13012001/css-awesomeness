import React from 'react';
import './welcomecss/style.css';
import './welcomecss/resetstyle.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Button from '@mui/material/Button';
export default function First() {
  const {auth} = React.useContext(AuthContext);
  return (
    <>
      <div className="top_bar" id="at">
        Budget Planner
      </div>
      <div className="top_bar" id="abps">
        <Link to="/login">
          <div>
            <button type="button" className="all_page_button1">
              Enter
            </button>
          </div>
        </Link>
        <Link to="/register">
          <div>
            <button type="button" className="all_page_button2">
              Register
            </button>
          </div>
        </Link>
      </div>

      <div id="home_box" className="child">
        <div className="home" id="home_">
          <div className="home_text">
            <div className="home_text1">Welcome to</div>
            <div className="home_text2">Budget Planner</div>
          </div>
          <div className="main_page_buttons">
            {!auth ? (
              <>
                <Link to="/login">
                  <div>
                    <button type="button" className="main_page_button1">
                      Enter
                    </button>
                  </div>
                </Link>
                <Link to="/register">
                  <div>
                    <button type="button" className="main_page_button2">
                      Register
                    </button>
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/expenses">
              <Button variant="contained" sx={{ backgroundColor: '#4CAF50' ,width:'20em',height:'3.5em'}}>
                DashBoard
              </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="content child" id="one">
        <div className="one_text" id="one_text_">
          <div className="one_text1" id="one_text1_">
            Visualise your Financial Activities
          </div>
          <div className="one_text2" id="one_text2_">
            Budget planner provides you with well categorise graphs and charts of your financial activities along side
            working as a record book for you so that you may never miss out on where you lost some money and whether it
            was a wrong choice or not.
          </div>
        </div>
      </div>
      <div className="content child" id="two">
        <div className="one_text" id="one_text__">
          <div className="one_text1">Keep track of Stocks</div>
          <div className="one_text2">
            Stay up to date about the information of the stocks you possess. Budget planner uses APIs and provides you
            with real time prices of the stocks along side comparing it with the price you bought that stock for and
            providing you information about your pro ts and losses in Stock market.
          </div>
        </div>
      </div>
      <div className="content child" id="three">
        <div className="one_text" id="one_text___">
          <div className="one_text1">Leap ahead of Time</div>
          <div className="one_text2">
            With the help of Machine Learning, Budget planner provides you the ability to predict the prices of stocks
            in near future with the help of the trends they have followed in the past. This will allow you to have a
            rough estimate about the increase or decrease in the price ofstock you are looking for, helping you to take
            decisions on the stocks you are confused about.
          </div>
        </div>
      </div>
    </>
  );
}
