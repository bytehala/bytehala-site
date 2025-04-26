import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};





const FeatureList: FeatureItem[] = [
  {
    title: 'Work in Progress',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        WIP. I'm migrating my dev.to articles.
        <br />
        <br />
        Dev: nerd stuff
        <br />
        Cool: stuff I like
        <br />
        <br />
        Coming soon
        <br />
        Life: my blog
      </>
    ),
  },
  // {
  //   title: 'Focus on What Matters',
  //   Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
  //   description: (
  //     <>
  //       Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
  //       ahead and move your docs into the <code>docs</code> directory.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
];


function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

const Month = ({ birthDate, completed, tooltip }: { birthDate: Date, tooltip: string, completed: 0| 1 | 2 | 3 | 4 }) => {
  return (
    <div className={styles.month} title={tooltip}>
      <div className={clsx(styles.quarter, completed >= 1 && styles.filled)} />
      <div className={clsx(styles.quarter, completed >= 2 && styles.filled)} />
      <div className={clsx(styles.quarter, completed >= 3 && styles.filled)} />
      <div className={clsx(styles.quarter, completed >= 4 && styles.filled)} />
    </div>
  );
};

const Year = ({ birthDate, year }: { birthDate: Date, year: number }) => {
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );
  return (
    <div className={styles.year}>
      {/* Repeat Month 12 times: */}
      {monthNames.map((month, index) => (
        // Anything before the current date is completed=4
        // Anything after the current date is completed=0

        <Month key={index} birthDate={birthDate} completed={
          year < new Date().getFullYear() ? 4 :
          year === new Date().getFullYear() && index < new Date().getMonth() ? 4 :
          year === new Date().getFullYear() && index === new Date().getMonth() ? 1 :
          0
        } tooltip={`${month} ${year}`} />
      ))}
    </div>
  );
}

export const Lifetime = ({ birthDate }: {birthDate: Date}) => {
  const lifeExpectancy = Array.from({ length: 80 }, (_, i) => i);
  return (
    <div className={styles.lifetimeWrapper}>
      <div className={styles.lifetime}>
        <div className={styles.lifetimeInner}>
          {lifeExpectancy.map((year) => <Year birthDate={birthDate} year={birthDate.getFullYear() + year} />)}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
       
      </div>
      <div>
        <br />
        Weeks before I die:
      </div>
      <Lifetime birthDate={new Date(1988, 1, 17)} />
    </section>
  );
}
