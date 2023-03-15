import React from 'react';



function NewPlayer(props) {

    const handleSubmit = (event) => {
        event.preventDefault()
        const name = event.target[0].value
        const phoneNumber = event.target[1].value
        props.addNewPlayer(name, phoneNumber)
    }

    const handleListRefresh = (event) => {
        props.handleListRefresh()
    }
    return (
        <div className="newPlayer">
            <div className="subscribe-box bg-gray-50">
                <div className="flex space-x-2 justify-center">
                    <h2 className="text-lg md:text-4xl font-medium leading-tight text-[#15376b] p-4">
                        Zapisz sie i zagraj z nami na
                        <span
                            className="ml-2 inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#32d7d3] text-white rounded">Orliku</span>
                    </h2>
                </div>

                <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className={'mx-auto space-x-4 p-5 flex flex-row'}>
                            <div className="">
                                <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Imie i Nazwisko</label>
                                <input onMouseDown={handleListRefresh} id="exampleFormControlInput1" className={'placeholder-black text-black p-4 ml-4'} type="text" placeholder="Wpisz Imie i Nazwisko" autoComplete="off" required/>
                            </div>
                        </div>
                        <div className={'mx-auto space-x-4 p-5 flex flex-row'}>
                            <div className="">
                                <label htmlFor="exampleFormControlInput2" className="form-label inline-block mb-2 text-gray-700">Numer Telefonu</label>
                                <input id="exampleFormControlInput2" className={'placeholder-black text-black p-4 ml-4'} type="number" placeholder="Wpisz Numer Telefonu" autoComplete="off" required/>
                            </div>
                        </div>
                    <button className={'m-8 bg-[#32d7d3] w-1/3 md:w-1/6 p-2 mx-auto text-white font-bold'} type="submit"><span>Zapisz Sie</span></button>
                </form>
            </div>
        </div>
    )
}

export default NewPlayer;