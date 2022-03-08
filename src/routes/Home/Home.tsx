import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import useAudioPermission from '../../hooks/useAudioPermission';

import './style.css';

const Home: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const [, askForPermission] = useAudioPermission({
    onGranted: () => navigate('/play'),
    onDenied: () => setIsOpen(true),
  });

  return (
    <main className="home">
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <section
        className="hero is-medium"
        style={{ position: 'relative', backgroundColor: '#ebfffc' }}
      >
        <div className="hero-body">
          <div className="columns is-mobile">
            <div className="column is-two-thirds">
              <p className="title is-size-5-mobile">Türetmeç</p>
              <p className="subtitle is-size-6-mobile">
                Bilgisayara karşı oynayacağınız kelime türetme oyununda üstün çıkabileceğinizi
                düşünüyorsanız bu oyun tam size göre.
              </p>
              <button
                className="button is-primary is-small is-outlined mt-4"
                type="button"
                onClick={() => askForPermission()}
              >
                Hemen oynamak için mikrofon iznini aç
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
