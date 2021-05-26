import React, { useState } from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventIcon from '@material-ui/icons/Event';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import './App.css';

import Table from './Table';
import Chart from './Chart';
import calculate from './calculations';

const defaultOverpayment = {month: '1', year: '0', amount: '0'};

export default () => {
    const [openAmountTip, setOpenAmountTip] = React.useState(false);
    const [openYearsTip, setOpenYearsTip] = React.useState(false);
    const [openRateTip, setOpenRateTip] = React.useState(false);
    const [openMonthlyTip, setOpenMonthlyTip] = React.useState(false);
    const [openSinglePayTip, setOpenSinglePayTip] = React.useState(false);

    const [initial, setInitial] = useState('200000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('25');
    const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
    const [overpayments, setOverpayments] = useState([defaultOverpayment]);

    const updateOverpayment = index => ({target}) =>
        setOverpayments(
            overpayments.map((overpayment, i) =>
                i === index
                    ? {...overpayment, [target.name]: target.value}
                    : overpayment
            )
        );

    const {monthlyPayment, payments} = calculate(
        +initial,
        +years,
        +rate,
        +monthlyOverpayment,
        overpayments
    );

    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <div className="navbar-brand" style={{fontFamily: 'Times New Roman', fontSize: 25}}>
                        Mortgage Overpayment Calculator
                    </div>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="col-md-8 col-sm-12">
                    <div className="col-sm-4">
                        <div>
                            <h2>Initial</h2>
                            <Tooltip title={<h6>Mortgage debt</h6>}>
                                <label>
                                    <AttachMoneyIcon className= {'material-icons'} />
                                    Amount
                                </label>
                            </Tooltip>
                            <input
                                type="number"
                                maxLength={7}
                                value={initial}
                                onChange={e => {
                                    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
                                    setInitial(e.target.value)
                                }}
                            />

                            <ClickAwayListener onClickAway={() => setOpenAmountTip(false)}>                             
                                <Tooltip
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    onClose={() => setOpenAmountTip(false)}
                                    open={openAmountTip}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={<h6>This is the total amount you owe</h6>}>
                                    <HelpIcon className= {'help-icon'} onClick={() => setOpenAmountTip(true)}/>
                                </Tooltip>                      
                            </ClickAwayListener>                   
                        </div>
                        <div>
                        <Tooltip title={<h6>Mortgage term</h6>}>
                            <label>
                                {/* <EventIcon className= {'material-icons'} /> */}
                                &nbsp;&nbsp;&nbsp;&nbsp;Years
                            </label>
                        </Tooltip>
                            
                            <input
                                type="number"
                                maxLength={2}
                                value={years}
                                onChange={e => {
                                    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
                                    setYears(e.target.value)
                                }}
                            />
                            <ClickAwayListener onClickAway={() => setOpenYearsTip(false)}>                             
                                <Tooltip
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    onClose={() => setOpenYearsTip(false)}
                                    open={openYearsTip}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={<h6>This is the number of years over which you are repaying your mortgage</h6>}>
                                    <HelpIcon className= {'help-icon'} onClick={() => setOpenYearsTip(true)}/>
                                </Tooltip>                      
                            </ClickAwayListener>
                        </div>
                        <div>
                        <Tooltip title={<h6>Current interest rate</h6>}>
                            <label> <span className='percentage'>% </span>Rate</label>
                        </Tooltip>
                            <input
                                type="number"
                                step={0.1}
                                value={rate}
                                onChange={e => {
                                    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
                                    setRate(e.target.value)
                                }}
                            />
                            <ClickAwayListener onClickAway={() => setOpenRateTip(false)}>                             
                                <Tooltip
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    onClose={() => setOpenRateTip(false)}
                                    open={openRateTip}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={<h6>This is the mortgage interest rate</h6>}>
                                    <HelpIcon className= {'help-icon'} onClick={() => setOpenRateTip(true)}/>
                                </Tooltip>                      
                            </ClickAwayListener>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div>
                            <h2>Overpayment</h2>
                            <label>Monthly</label>
                            <input
                                type="number"
                                maxLength={5}
                                value={monthlyOverpayment}
                                onChange={e => {
                                    e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
                                    setMonthlyOverpayment(e.target.value)
                                }}
                            />
                            <ClickAwayListener onClickAway={() => setOpenMonthlyTip(false)}>                             
                                <Tooltip
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    onClose={() => setOpenMonthlyTip(false)}
                                    open={openMonthlyTip}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={<h6>This is the regular monthly overpayment made on top of your normal monthly payment</h6>}>
                                    <HelpIcon className= {'help-icon'} onClick={() => setOpenMonthlyTip(true)}/>
                                </Tooltip>                      
                            </ClickAwayListener>
                        </div>
                        <div>
                            <label>Year</label>
                            <label>Month</label>
                            <label>
                                <AttachMoneyIcon className= {'material-icons'} />
                                Amount
                            </label>
                            <ClickAwayListener onClickAway={() => setOpenSinglePayTip(false)}>                             
                                <Tooltip
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    onClose={() => setOpenSinglePayTip(false)}
                                    open={openSinglePayTip}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={<h6>This is the lump sum overpayment made during the specified year and month</h6>}>
                                    <HelpIcon className= {'material-icons'} onClick={() => setOpenSinglePayTip(true)}/>
                                </Tooltip>                      
                            </ClickAwayListener>
                        </div>
                        {overpayments.map(({year, month, amount}, i) => (
                            <div key={i}>
                                <input
                                    type="number"
                                    min="0"
                                    max={years}
                                    value={!!year && Math.abs(year) >= 0 ? Math.abs(parseInt(year)) : null}
                                    name="year"
                                    onChange={updateOverpayment(i)}
                                />
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={!!month && Math.abs(month) >= 0 ? Math.max(1, Math.min(12, Math.abs(parseInt(month)))) : null}
                                    name="month"
                                    onChange={updateOverpayment(i)}
                                />
                                <input
                                    type="number"
                                    value={!!amount && Math.abs(amount) >= 0 ? Math.abs(amount) : null}
                                    name="amount"
                                    onChange={updateOverpayment(i)}
                                />

                                {i === overpayments.length - 1 ? (
                                    <IconButton  color="secondary" variant="outlined"
                                                 onClick={() =>
                                                     setOverpayments([...overpayments, defaultOverpayment])
                                                 }>
                                        <AddIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton  color="secondary" variant="outlined"
                                                 onClick={() =>
                                                     setOverpayments(overpayments.filter((_, j) => j !== i))
                                                 }>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="col-sm-12">
                        <h2>
                            Monthly Payment
                            <span className="money">
                {(+monthlyOverpayment + monthlyPayment).toFixed(2)}
              </span>
                        </h2>
                        <Chart payments={payments}/>
                    </div>
                </div>
                <Table className="col-sm-4" payments={payments}/>
            </div>
        </div>
    );
};
