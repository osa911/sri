import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import selectors from './selectors';
import moment from 'moment';
import { DateField, Calendar } from 'react-date-picker';
import { Row, Col } from 'react-bootstrap';

const nowDate = moment();
let filterEntity = [];
let currencyArr = [];

class App extends Component {
  constructor(props) {
    super(props);
    const { load } = this.props;
    load(nowDate.format('DD/MM/YYYY'));
  }

  changeDate = (val) => {
    const { load } = this.props;
    load(val);
  }
  componentWillUpdate(next) {
    this.filterByCurrency(next.entity,next.currencyFilter);
    this.setChecked(next.entity);
  }

  filterByCurrency = (entity, filterArr ) => {
    filterEntity = entity.Valute.filter(item => (
      filterArr.indexOf(item.CharCode) !== -1
    ))
    return filterEntity;
  }

  changeFilter = (item) => (e) => {
    const { currencyFilter, entity, setFilter} = this.props;
    if(currencyFilter.indexOf(item.name) == -1){
      currencyFilter.push(item.name);
    } else {
      currencyFilter.map( (i, key) => {
        item.name == i &&
        (currencyFilter.splice(key, 1))
      });
    }
    setFilter(currencyFilter)
    this.filterByCurrency(entity, currencyFilter);
    this.setChecked(entity);
    this.forceUpdate();
  }

  setChecked = (entity) => {
    const { currencyFilter  } = this.props;
    currencyArr = entity.Valute.map(item => (
      { name: item.CharCode, checked: currencyFilter.indexOf(item.CharCode) !== -1 ? true : false }
    ))
    return currencyArr;
  }

  render() {
    const { isload, reportDate } = this.props;
    return (
      <div className='App' style={{ margin: '20px'}}>
        <h1>Sri Infotech App</h1>
        {isload ?
          <p>Подождите, данные загружаются...</p>
        :<div>
           <p>Выбраная дата:</p>

           <DateField
             dateFormat="DD/MM/YYYY"
             forceValidDate
             updateOnDateClick
             collapseOnDateClick
             defaultValue={nowDate}
             showClock={false}
           ><Calendar
             navigation
             locale="ru"
             forceValidDate
             highlightWeekends
             highlightToday
             weekNumbers
             weekStartDay={1}
             footer={false}
             maxDate={nowDate}
             onChange={this.changeDate}
           />
           </DateField>

           <div style={{ 'marginTop': '15px' }}>
            <span style={{ 'fontWeight': 'bold' }}>Отчет сформирован на дату: {reportDate}
            </span>
            <Row>
              <Col md={4} sm={4}>
                <Row>
                  <Col md={3} >
                    Валюта
                  </Col>
                  <Col md={3} >
                    Номинал
                  </Col>
                  <Col md={6} >
                    Курс
                  </Col>
                </Row>

              {filterEntity && filterEntity.map(item => (
                  <Row key={item.ID}>
                    <Col key={item.CharCode} md={3} >
                      {item.CharCode}
                    </Col>
                    <Col key={item.CharCode+'nominal'} md={3} >
                      {item.Nominal}
                    </Col>
                    <Col key={item.CharCode+'value'} md={6} >
                      {item.Value}
                    </Col>
                  </Row>
                ))
              }
              </Col>
              <Col md={3} sm={3}>
                {currencyArr && currencyArr.map(item => (
                  <Row key={item.name}>
                    <Col>
                    <input
                      checked={item.checked}
                      type='checkbox'
                      onChange={this.changeFilter(item)}
                    /> {item.name}
                    </Col>
                  </Row>

                ))}
              </Col>
            </Row>
           </div>

          </div>
        }
      </div>
    );
  }
}

export default connect(selectors, actions)(App);
