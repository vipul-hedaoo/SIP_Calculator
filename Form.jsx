
import React, {useState} from 'react';
import {Slider, Typography, Box, checkboxClasses} from '@mui/material';
import{Chart as ChartJs,Tooltip,Title,ArcElement,Legend} from 'chart.js';
ChartJs.register(
    Tooltip,Title,ArcElement,Legend
);

import { Doughnut } from 'react-chartjs-2';
const From = () => {
    let amount=0;
    const[totalinvest,settotalinvest]=useState(1);
    const [returns,setreturns]=useState(1);
     const[TotalAmount,setTotalAmount]=useState(0);
    const[investedmonthly,setinvestedmonthly]=useState(0);
    const[exitload,setexitload]=useState(0.0);
    const[status1,setstatus1]=useState(true);
    const[isEnable1,setisEnable1]=useState(false);
    const[expencerate,setexpencerate]=useState(0);
    const[status,setstatus]=useState(true)
    const[isEnable,setisEnable]=useState(false);
    const[valuepersent ,setValuepersent]=useState(20);
    const[years,setyears]=useState(1);

    const setpersent = (event)=>{
         setValuepersent(event.target.value);
    }
    const setyear = (event)=>{
        setyears(event.target.value);
    }
    const setexpence=(event)=>{
        setexpencerate(event.target.value);
    }
    const setexit=(event)=>{
        setexitload(event.target.value);
    }
    const toggleSlider = () => {
        setisEnable(!isEnable);
        setstatus(!status);
    };
    const toggleSlider1 = () => {
        if(years<=2)
        {
            setisEnable1(!isEnable1);
            setstatus1(!status1);
        }

    };
    const handlesubmit=(event)=>{
        event.preventDefault();
        const formdata =new FormData();
        formdata.append("investedmonthly",investedmonthly);
        amount=investedmonthly-((investedmonthly/100)*expencerate);
        let month=years*12;
        settotalinvest(amount*month);
        let i=(valuepersent/100)/12;
        let final=amount*((Math.pow((1+i),month)-1)/i)*(i+1);
        final=final-((final/100)*exitload)
        console.log(final);
        setTotalAmount(Math.round(final));
        setreturns(Math.round(TotalAmount-totalinvest));
        console.log(returns);
        console.log(totalinvest);
    }

    const data={
    datasets:[{
        data:[totalinvest,returns],
        backgroundColor:['turquoise','purple']
    }],
        labels:['Invested','Return']
    }

    return (
         <div className="flex ">
            <div className=" w-1/2 bg-white px-20 py-10 rounded-lg shadow-lg border-t-4 border-b-4 border-l-0 border-r-0 border-gradient">
                <img src="./logo.jpg" className="h-10 w-10 text-center m-auto rounded-full"/>
                <h2 className="text-3xl font-semibold text-center mb-4">SIP Calculator</h2>
                <form className="space-y-4" onClick={handlesubmit}>
                    <div>
                        <label  className="block text-sm font-medium text-gray-700">Invest Monthly</label>
                        <input id="username" type="number" className=" bg-gray-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-8" onChange={(event) => setinvestedmonthly(event.target.value)} />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium text-gray-700">Rate Of Return {valuepersent} %</label>
                        <Slider
                            value={valuepersent}
                           onChange={setpersent}
                           min={10}
                           max={50}
                        />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium text-gray-700">{years} Years</label>
                        <Slider
                            value={years}
                            onChange={setyear}
                            min={1}
                            max={10}
                            step={1}
                        />
                    </div>
                    <div className="flex">
                        <div className="pr-10">
                        <label  className="block text-sm font-medium text-gray-700">Expence Ratio {expencerate} %</label>
                        <button onClick={toggleSlider} type="checkbox">
                           {/*// { isEnable ? :*/}
                        </button>
                            <input type="checkbox" checked={isEnable} onClick={toggleSlider}/>
                        <Slider
                            value={expencerate}
                            onChange={setexpence}
                            disabled={status}
                            min={1}
                            max={4.00}
                            step={0.01}
                        />
                        </div>
                        <div className="pl-10">
                            <label  className="block text-sm font-medium text-gray-700"> Exit Load {exitload} %</label>
                            <button onClick={toggleSlider} type="checkbox">
                                {/*// { isEnable ? :*/}
                            </button>
                            <input type="checkbox" checked={isEnable1} onClick={toggleSlider1}/>
                            <Slider
                                value={exitload}
                                onChange={setexit}
                                disabled={status1}
                                min={0.1}
                                max={4}
                                step={0.01}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50" >Calculate</button>
                    </div>
                </form>
            </div>
           <div className=" grid-rows-2 bg-white rounded-2xl shadow-2xl mx-2 w-1/2">
                <div className="" >
                    <label className=" flex rs-text-bold items-center justify-center mt-5">Total Amount:- {TotalAmount} rs</label>
                </div>
               <div className="p-1 m-5">
                <Doughnut data={data}/>
               </div>
           </div>
          </div>
    );
};


export default From;

