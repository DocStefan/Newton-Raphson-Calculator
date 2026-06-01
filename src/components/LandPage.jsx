import React from 'react'
import { useState, useRef, useEffect, useId, useMemo, useContext, useCallback } from 'react'
import * as math from 'mathjs'
import Algebrite from "algebrite"
import "../styles/LandPageStyle.css"


function LandPage() {

  let [firstValue, setFirstValue] = useState("")
  let [functionEval, setFunctionEval] = useState("")

  let [rootResult, setRootResult] = useState("")
  let errorHandler = useRef({ state: false, code: "" })

  let [errorHelper, setErrorHelper] = useState(0)

  function est_newraph(Xn) {

    if (math.derivative(functionEval, "x").toString() == 0 || functionEval == "" || math.derivative(functionEval, "x").toString() == "" || firstValue == "") {

      errorHandler.current = { state: true, code: "Verifique los datos ingresados" }
      setErrorHelper(prev => prev + 1);
      return

    } else {

      errorHandler.current = { state: false, code: "" }
      setErrorHelper(prev => prev + 1);

    }

    let Xnr = Xn - (math.evaluate(functionEval, { x: Xn }) / math.evaluate(math.derivative(functionEval, "x").toString(), { x: Xn }))

    return Xnr

  }

  function calc_newraph() {

    let Xnr_calc = est_newraph(firstValue)

    if (errorHandler.current.state) {

      setErrorHelper(prev => prev + 1);

      return

    }

    let iterations = 0;
    const maxIterations = 100;

    while (math.abs(math.evaluate(functionEval, { x: Xnr_calc })) > 0.000000001 && iterations < maxIterations) {

      Xnr_calc = est_newraph(Xnr_calc)
      iterations++

    }

    if (iterations === maxIterations) {

      errorHandler.current = {
        state: true,
        code: "El método no convergió en 100 iteraciones"
      }

      setErrorHelper(prev => prev + 1)
      return

    }

    if(isNaN(Xnr_calc) || !isFinite(Xnr_calc)) {

        errorHandler.current = {
        state: true,
        code: "El método no convergió en 100 iteraciones"
      }

      setErrorHelper(prev => prev + 1)
      return

    } else {

    setRootResult(Number(Xnr_calc.toFixed(9)).toString())

    }

    console.log(Xnr_calc)

  }

  return (

    <div className="MainLand">

      <div className="MainContainer">

        <span className='MainTittle'>Metodo de Newton-Raphson</span>

        <div className='MainInputs'>

          <span className='InputsTexts'>1. Ingrese el primer factor "Xn"</span>

          <input type='number' className='CalcInputs' onChange={(e) => setFirstValue(e.target.value)} ></input>

          <span className='InputsTexts'>2. Ingrese la funcion de "x"</span>

          <input type='text' className='CalcInputs' onChange={(e) => setFunctionEval(e.target.value)}></input>

          <button type='button' onClick={(e) => { calc_newraph() }} className='CalcButton'>Calcular</button>

          {errorHandler.current.state ? <div className='ErrorContainer'>

            <div className='ErrorBox'>
              <span className='Error'>Error: {errorHandler.current.code}</span>
            </div>

          </div> :

            <span className='FinalRoot' style={{ visibility: rootResult ? 'visible' : 'hidden' }}>La funcion ingresada tiene una raiz en {rootResult}</span>

          }

        </div>

      </div>

      <img className='fotoLogo' src='./logoHaedo.png'></img>

    </div>

  )
}

export default LandPage