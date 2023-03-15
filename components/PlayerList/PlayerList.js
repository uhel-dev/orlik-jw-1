import React from 'react';
import swal from 'sweetalert';


export class Player {
    fullName
    mobile
    playerType
    timestamp

    constructor(name, mobile, playerType = "zawodnik", createdAt) {
        this.fullName = name;
        this.mobile = mobile;
        this.playerType = playerType;
        this.timestamp = createdAt;
    }
}

function PlayerList({players, removePlayers}) {

    const getFormattedMobileNumber = (n) => {
        if(n) {
            const number = n.toString()
            if (number) {
                return (number.includes('+48') ? '' : '+48 ') + number.match(/.{1,3}/g).join(' ')
            }
        }
    }

    // @ts-ignore
    const handleRemove = async (data) => {
        swal({
            title: 'Wpisz Haslo',
            text: 'Nie chcesz grac? Wpisz "exit" i zrob miejsce dla innych',
            // @ts-ignore
            content: "input",
            button: {
                text: "Potwierdz!",
                closeModal: false,
            },
        })
            .then(pwd => {
                if (!pwd) throw null;
                if (pwd === 'exit' || pwd === 'Exit' || pwd === 'EXIT') {
                    swal("Zawodnik Zostal Usuniety!", "Podales poprawne haslo!", "success");
                    removePlayers(data)
                }
                else {
                    swal("Zawodnik Nie Zostal Usuniety!", "Podales nie poprawne haslo!", "error");
                }
            })


    }
    return (
        <div className="playerList">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                <tr>
                                    <th scope="col" className="text-xs md:text-lg px-3 md:px-6 font-medium text-gray-900 py-4 text-left font-bold">
                                        #
                                    </th>
                                    <th scope="col" className="text-xs md:text-lg px-3 md:px-6 font-medium text-gray-900 py-4 text-left font-bold">
                                        Imie
                                    </th>
                                    <th scope="col" className="text-xs md:text-lg px-3 md:px-6 font-medium text-gray-900 py-4 text-left font-bold">
                                        Numer Telefonu
                                    </th>
                                    <th scope="col" className="text-xs md:text-lg px-3 md:px-6 font-medium text-gray-900 py-4 text-left font-bold">
                                        Pozycja
                                    </th>
                                    <th scope="col" className="text-xs md:text-lg px-3 md:px-6 font-medium text-gray-900 py-4 text-left font-bold">
                                        Usun
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    players && players.map((player, i) => {

                                        return (
                                            <tr key={player.fullName} className={player.playerType === 0 ? `bg-blue-100` : (player.playerType === 1 ? "bg-white" : "bg-red-100")}>
                                                <td className="text-xs md:text-lg px-3 md:px-6 py-4 whitespace-nowrap font-medium text-gray-900">{i + 1}</td>
                                                <td className="text-xs md:text-lg px-3 md:px-6 text-gray-900 font-light py-4 whitespace-nowrap">
                                                    {player.fullName}
                                                </td>
                                                <td className="text-xs md:text-lg px-3 md:px-6 text-gray-900 font-light py-4 whitespace-nowrap">
                                                    <a href={`tel:+48${player.mobile}`} className="no-underline text-gray-900">{getFormattedMobileNumber(player.mobile)}</a>
                                                </td>
                                                <td className="text-xs md:text-lg px-3 md:px-6 text-gray-900 font-light py-4 whitespace-nowrap">
                                                    {player.playerType === 0 ? "Kapitan" : (player.playerType === 1 ? "Zawodnik" : "Rezerwowy") }
                                                </td>
                                                    <td className="text-xs md:text-lg px-3 md:px-6 text-gray-900 font-light py-4 whitespace-nowrap">
                                                    { player.playerType !== 0 && (
                                                        <>
                                                            <button data-tooltip-target="tooltip-default" type="button" onClick={() => {handleRemove(player)}}
                                                                    className="p-2 inline-block rounded-full bg-[#32d7d3] text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                                                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm370.752 448-90.496-90.496 45.248-45.248L512 530.752l90.496-90.496 45.248 45.248L557.248 576l90.496 90.496-45.248 45.248L512 621.248l-90.496 90.496-45.248-45.248L466.752 576z"/></svg>
                                                            </button>
                                                        </>
                                                    )}
                                                    </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerList


