import React, { Component } from 'react';

import { data } from './defaultData';
import { handleUpdateClick } from './logic';
import './style/index.less';


export class Home extends Component {
    state = {};

    render() {
      return (
        <div className="home">
          <h1 className="app__header">Birthday Cal</h1>

          <div className="app__content">

            <hr className="border-line app__border" />

            <div id="work-area">
              <h1 className="cal__title">Work Area</h1>
              <ul className="calendar clearfix js-calendar">
                <li className="cal__day day--empty" data-day="mon">
                  <div className="day__date" />
                  <div className="day__people" />
                </li>
                <li className="cal__day" data-day="tue">
                  <div className="day__date" />
                  <div className="day__people">
                    <div className="day__person">AB</div>
                  </div>
                </li>
                <li className="cal__day" data-day="wed">
                  <div className="day__date" />
                  <div className="day__people" />
                </li>
                <li className="cal__day" data-day="thu">
                  <div className="day__date" />
                  <div className="day__people" />
                </li>
                <li className="cal__day" data-day="fri">
                  <div className="day__date" />
                  <div className="day__people" />
                </li>
                <li className="cal__day" data-day="sat">
                  <div className="day__date" />
                  <div className="day__people" />
                </li>
                <li className="cal__day" data-day="sun">
                  <div className="day__date" />
                  <div className="day__people" />
                </li>
              </ul>

              <div className="app__inputs">

                <textarea
                  className="app__txt js-json"
                  id="textarea-input"
                  placeholder="Paste your friends list json here."
                  defaultValue={data}
                />

                <div className="app__actions">
                  <label>Year</label>
                  <input className="app__input js-year" id="year-value" type="text" defaultValue="2014" />
                  <a className="app__button js-update" onClick={handleUpdateClick}>Update</a>
                </div>

              </div>

            </div>
            <hr className="border-line app__border" />
          </div>
        </div>
      );
    }
}
