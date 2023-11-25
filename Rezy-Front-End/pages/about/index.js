import { Layout } from 'layouts/default';
import { TokyoAirWrapper } from '../../components/Leaderboard/TokyoAirWrapper';
import s from './about.module.scss';

export default function About() {
  return (
    <Layout theme="dark" className={s.home}>
      <section className={s.content}>
        <div className="py-20 mt-20">
          <TokyoAirWrapper />
        </div>
        {/* <ParticleWallet /> */}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      id: 'about',
    },
  };
}
