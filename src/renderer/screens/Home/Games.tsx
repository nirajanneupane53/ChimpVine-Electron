import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import LoadingModal from 'renderer/components/Loading';
import game1 from '../../../../assets/images/games/Arth.png';
import game2 from '../../../../assets/images/games/drag.png';
import game3 from '../../../../assets/images/games/combine.png';
import game4 from '../../../../assets/images/games/bubble.png';

import './css/gameOpen.css';
interface Games {
  name: string;
  image: string;
  link: string;
}

// interface Gamedata{
//   name: string;
//   link:string;
// }

function Games() {
  const [cardModule, setCardModule] = useState<any>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('Close-Modal', handleCloseModal);
    window.electron.ipcRenderer.on('Game-State', async (arg: any) => {
      // eslint-disable-next-line no-console
      const data = await arg;

      setModalOpen(data);
    });
  }, []);
    useEffect(() => {
      window.electron.ipcRenderer.once('Game-State', async (arg: any) => {
        // eslint-disable-next-line no-console
        const data = await arg;

        setModalOpen(data);

        // setTestlocation(data);
      });
    }, []);

  useEffect(() => {
    import('react-bootstrap').then((module) => {
      setCardModule(module.Card);
    });
  }, []);

  const games: Games[] = [
    {
      name: 'Arithmetica',
      image: game1,
      link: 'assets/games/Grade2/Maths/Arthematica/arithmetica.exe',
    },
    {
      name: 'Drag & Drop',
      image: game2,
      link: 'assets/games/Grade1/English/DragandDrop/Drag-and-Drop.exe',
    },
    {
      name: 'Combining Shape',
      image: game3,
      link: 'assets/games/Grade1/Maths/Combine the shape/Combine The Shapes.exe',
    },
    {
      name: 'Bubble Multiple',
      image: game4,
      link: 'assets/games/Grade3/Maths/Bubble-Multiple/Bubblemultiples.exe',
    },
  ];


  const handleCardClick = (link: any) => {
    // console.log(link);
    // window.electron.ipcRenderer.sendMessage('start-game', link);
    const sentData = {
      event: 'GamesOpen',
      link: link,
    };
    window.electron.ipcRenderer.sendMessage('Screen-data', sentData);
  };

  return (
    <div className="my-5">
      <h2 className="fw-bold">Games</h2>

      <div className="pt-3 d-flex gap-5">
        {games.map((game, index) => (
          <div
            style={{ cursor: 'Pointer' }}
            onClick={() => handleCardClick(game.link)}
            key={index}
          >
            {cardModule && (
              <Card className="game-card">
                {/* <Card.Img variant="top" src={game.image} /> */}
                <Card.Img variant="top" src={game.image} />
                {/* <Card.Body>
                  <Card.Title className="text-black-50 text-center fw-bold">
                    <h4 className="fw-bold">{game.name}</h4>
                  </Card.Title>
                </Card.Body> */}
              </Card>
            )}
          </div>
        ))}
      </div>
      <LoadingModal modalOpen={modalOpen} onHide={handleCloseModal} />
    </div>
  );
}

export default Games;
