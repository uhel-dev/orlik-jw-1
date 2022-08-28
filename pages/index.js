import Image from 'next/image'
import {useEffect, useState} from "react";
import Header from "../components/Header/Header";
import PlayerList from "../components/PlayerList/PlayerList";
import NewPlayer from "../components/NewPlayer/NewPlayer";
import heroUrl from '../public/assets/hero1.png';
import favUrl from '../public/fav.svg';
import hygraphClient from "../lib/hygraphClient";
import {gql} from "graphql-request";
import Head from "next/head";


export default function Home() {

  const [players, setPlayers] = useState([])


  useEffect(() => {
    return async () => {
      const { players } = await hygraphClient.request(
          gql`
                query MyQuery {
                  players {
                    id
                    fullName
                    mobile
                    playerType
                    createdAt
                  }
                }
            `,
      )
      setPlayers(players);
    };
  }, [players]);


  useEffect(() => {
    return async () => {
      const { players } = await hygraphClient.request(
          gql`
                query MyQuery {
                  players {
                    id
                    fullName
                    mobile
                    playerType
                    createdAt
                  }
                }
            `,
      )
      setPlayers(players);
    };
  }, []);


  const addNewPlayer = async (name, phoneNumber) => {
    if (players.length < 12) {
      if (players.filter(p => p.fullName === name).length !== 1) {
        const currentPlayers = [...players]

        await hygraphClient.request(
            gql`
              mutation MyMutation {
                createPlayer(data: {fullName: "${name}", mobile: ${phoneNumber}, playerType: ${(currentPlayers.length < 10 ? 1: 2)}}) {
                  id
                }
              }
            `
        ).then(async res => {

          await hygraphClient.request(
              gql`
                 mutation MyMutation {
                  publishPlayer(where: {id: "${res.createPlayer.id}"}) {
                    id
                  }
                }
            `
          )
        });

        setPlayers([])

      }
      else {
        swal({
          title: "Zawodnik jest juz na liscie",
          text: "Zawodnik o takim samym Imieniu i Nazwisku istnieje juz na liscie.",
          icon: "error"
        })
      }
    }

    if (players.length >= 12) {
      swal({
        title: "Pelny Sklad",
        text: "Przepraszamy, w tym tygodniu mamy juz pelny sklad. Sproboj za tydzien!",
        icon: "warning"
      })
    }
  }

  const removePlayer = async (player) => {
    await hygraphClient.request(
        gql`
            mutation MyMutation {
              deletePlayer(where: {id: "${player.id}"}) {id}
            }
            `
    ).then(res => {
      setPlayers([])
    })

  }


  return (
      <div className="App">
        <Head>
          <link rel="icon" type="image/svg+xml" href="/fav.svg" />
          <title>KotowscyDent - Piłka Nożna (Orlik) </title>
        </Head>
        <div className="container mx-auto w-full md:w-1/2">
          <Header/>
          <Image className={'w-full h-full'} src={heroUrl} alt='Hero Image'/>
          <PlayerList players={players} removePlayers={removePlayer}/>

          <div className="mt-4">
            <NewPlayer addNewPlayer={addNewPlayer}/>
          </div>

        </div>

        <footer className="bg-gray-100 text-center lg:text-left mt-16">
          <div className="container p-6 text-gray-800 mx-auto">
            <div className="grid lg:grid-cols-2 gap-4 ">
              <div className="mb-6 md:mb-0">
                <h5 className="font-medium mb-2 uppercase">Zasady</h5>

                <p className="mb-4">
                  - 6 vs 6 <br/>
                  - Tylko Dorosli <br/>
                  - Rezerwowi nie graja <br/>
                </p>
              </div>

              <div className="mb-6 md:mb-0">
                <h5 className="font-medium mb-2 uppercase">Polityka prywatności</h5>

                <p className="mb-4">
                  Informujemy, że strona orlik-jw.pl nie wykorzystuje plikow cookie. <br/>
                  Zapisujac sie na naszej lisicie wyrażasz zgodę na używanie twojego numeru w celach kontaktowych, <br/>
                  ale tylko w wypadku nieobecnosci na boisku.
                </p>
              </div>
            </div>
          </div>

        </footer>
      </div>
  )
}


// export async function getServerSideProps() {
//   const { players } = await hygraphClient.request(
//       gql`
//         query MyQuery {
//           players {
//             id
//             fullName
//             mobile
//             playerType
//             createdAt
//           }
//         }
//     `,
//   );
//
//   return {
//     props: {
//       players,
//     },
//   };
// }