import { Layout } from 'layouts/default';
import { SecondaryFeatures } from '../../components/Leaderboard/Features';
import { Hero } from '../../components/Leaderboard/Hero';
import CardGrid from '../../components/home/card-grid';
import s from './home.module.scss';
import TitlesContainer from './titles-container';
import VideoContainer from './video-container';
export default function Home() {
  return (
    <Layout theme="dark" className={s.home}>
      <div className="relative">
        {/* //video component replace */}
        <div className="video-wrapper font-aeonik">
          <VideoContainer />
          <div className={s.container}>
            <section className={s.content}>
              {/* replace with component Text */}
              <TitlesContainer />
            </section>
            <div className={s.cardGridContainer}>
              <CardGrid />
            </div>
          </div>
        </div>
      </div>
      <SecondaryFeatures />
      <Hero />
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    },
  };
}
