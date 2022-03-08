import React, { FunctionComponent } from 'react';
import './style.css';

const HowToPlay: FunctionComponent = () => {
  return (
    <main className="how-to-play container is-max-widescreen">
      <div className="content p-4 mt-4">
        <h1 className="title">Nasıl Oynanır?</h1>
        <p>Türetmeç, bilgisayara karşı oynanan kelime türetme oyunudur. </p>
        <p>
          Oyunun amacı, verilen zaman dilimi içerisinde türetilmiş kelimenin son harfine göre yeni
          bir kelime türetmektir. Bu verilen süre içerisinde kelime türetemeyen ya da daha önce
          türetilmiş olan bir kelimeyi söyleyen oyuncu, oyunu kaybeder.
        </p>

        <h1 className="title">Oyun Kuralları</h1>
        <ul>
          <li>Oyunu oynayabilmeniz için mikrofonun izninizin açık olması gerekmektedir.</li>
          <li>
            Oyun başladığında, her oyuncunun
            <strong>&lt;8 saniye </strong>
            süre içinde bir kelime türetmesi gerekmektedir. Bu süre içerisinde kelime türetemeyen
            oyuncu
            <strong> oyunu kaybeder.</strong>
          </li>
          <li>
            Oyun içerisinde, oyuncuların daha önceden türetilmiş kelimeleri söylememesi
            gerekmektedir. Daha önceden türetilmiş kelimeyi türeten oyuncu
            <strong> oyunu kaybeder.</strong>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default HowToPlay;
