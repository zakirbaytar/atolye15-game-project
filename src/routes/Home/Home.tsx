import React, { FunctionComponent } from 'react';

import { useNavigate } from 'react-router-dom';
import AudioPermissionModal from '../../containers/AudioPermissionModal/AudioPermissionModal';
import useAudioPermission from '../../hooks/useAudioPermission';

import './style.css';

const Home: FunctionComponent = () => {
  const navigate = useNavigate();
  const { askForPermission } = useAudioPermission();

  return (
    <main className="home">
      <AudioPermissionModal />
      <section className="hero is-large is-relative">
        <div className="container  is-max-widescreen">
          <div className="hero-body">
            <div className="columns is-mobile">
              <div className="column is-8">
                <p className="title is-size-5-mobile">Türetmeç</p>
                <p className="subtitle is-size-6-mobile">
                  Bilgisayara karşı oynayacağınız kelime türetme oyununda üstün çıkabileceğinizi
                  düşünüyorsanız bu oyun tam size göre.
                </p>
                <button
                  className="button is-primary is-outlined mt-4"
                  type="button"
                  onClick={() => {
                    askForPermission(() => {
                      navigate('/play');
                    });
                  }}
                >
                  Hemen oynamak için mikrofon iznini aç
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
